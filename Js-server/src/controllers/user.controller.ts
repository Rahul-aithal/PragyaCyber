import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { IUser, User } from "../models/User.model";
import { asyncHandler } from "../utils/asyncHandlers";
import { ApiResponse } from "../utils/ApiResponse";

const generateAccessAndRefereshTokens = async (
  userId: mongoose.Types.ObjectId | unknown
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user?.generateAccessToken();

    await user?.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token",
        [error.message]
      );
    } else {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token",
        ["An unknown error occurred"]
      );
    }
  }
};

const singUpUser = asyncHandler(async (req: Request, res: Response) => {
  // Extract user details from the request body
  const { email, password } = req.body;

  // Check if a user with the same email already exists
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exists");
  }

  // Create a new user with the provided details
  const newUser: IUser = await User.create({
    password,
    email,
  });

  // Generate access and refresh tokens for the new user
  const { accessToken } = await generateAccessAndRefereshTokens(newUser._id);

  // Define cookie options for secure token storage
  const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict" as "strict" | "lax" | "none",
  };

  // Set access and refresh tokens in cookies and send response
  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(201, newUser));
});

// Login user endpoint handler
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // Extract username and email from request body
  const { usn, email } = req.body;

  // Validate required fields
  if (!usn || !email) {
    console.log({ usn, email });

    throw new ApiError(400, "Please provide both usn and email");
  }

  // Find user by email, excluding createdAt, updatedAt, and refreshToken fields
  const user = await User.findOne({ email })
    .select(" -createdAt -updatedAt -refreshToken -role")
    .populate("streak");

  // Handle user not found scenario
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // Check if user is authorized

  const verify = await user.isPasswordCorrect(usn);

  if (!verify) throw new ApiError(401, "USN is not correct");

  // Generate access and refresh tokens for the user
  const { accessToken } = await generateAccessAndRefereshTokens(user._id);

  // Define cookie options for secure token storage
  const options = {
    httpOnly: false,
    secure: true,
    path: "/",
    sameSite: "none" as "strict" | "lax" | "none",
  };

  // Set access and refresh tokens in cookies and send response
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user));
});
/**
 * Handles the logout process for a user.
 *
 * @param {Request} req - The request object containing user data.
 * @param {Response} res - The response object used to send back data to the client.
 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
 */
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  // Extract user id from JWT token
  const user = await User.findById(res.locals.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict" as "strict" | "lax" | "none",
  };
  // Clear user session cookies
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, user));
});

export { logOutUser, loginUser, singUpUser };
