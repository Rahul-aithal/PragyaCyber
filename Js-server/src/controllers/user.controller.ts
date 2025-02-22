import mongoose from "mongoose";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import User, { IUser } from "../models/User.model";
import { asyncHandler } from "../utils/asyncHandlers";
import { ApiResponse } from "../utils/ApiResponse";
import userType, { userSchema } from "../types/user.type";

// Using user's generateAcccess Tocken we create and return the JWT token
// JWT tocken containes user's id and singed
const generateAccessTokens = async (
  userId: mongoose.Types.ObjectId | unknown
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

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

// Using email and password specified in the userType and parse it
// If no user with same email found then create document
// Send JWT tocken as cookie
const singUpUser = asyncHandler(async (req: Request, res: Response) => {
  // Extract user details from the request body
  const { email, password }: userType = req.body;

  await userSchema.parseAsync({ email, password });

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const newUser: IUser = await User.create({
    password,
    email,
  });

  // Generate access and refresh tokens for the new user
  const { accessToken } = await generateAccessTokens(newUser._id);

  // Define cookie options for secure token storage
  const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict" as "strict" | "lax" | "none",
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(201, newUser)); //for dev only
});

// Use email and password and parse it, then Authorize using password
// Set access and refresh tokens in cookies and send response
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { password, email }: userType = req.body;

  await userSchema.parseAsync({ email, password });

  const user = await User.findOne({ email }).select(" -createdAt -updatedAt ");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const verify = await user.isPasswordCorrect(password);

  if (!verify) throw new ApiError(401, "⚠️ Password is not correct");

  const { accessToken } = await generateAccessTokens(user._id);

  // Define cookie options for secure token storage
  const options = {
    httpOnly: false,
    secure: true,
    path: "/",
    sameSite: "none" as "strict" | "lax" | "none",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user)); //for dev only
});

// Extract user id from JWT token
// Clear user session cookies
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
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

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, user)); //for dev only
});

export { logOutUser, loginUser, singUpUser };
