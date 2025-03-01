import Report from "../models/Report.model";
import UserDetail from "../models/UserDetail.model";
import userDetailType, { userDetailSchema } from "../types/userDetail.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import { Request, Response } from "express";

// Create a new user detail record
export const createUserDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { url, username }: userDetailType = req.body;
    const repoertId = res.locals.report;
    await userDetailSchema.parseAsync({
      url,
      username,
    });

    const userDetail = await UserDetail.create({
      url,
      username,
    });

    if (!userDetail) {
      throw new ApiError(500, "Failed to create user detail");
    }

    await Report.findByIdAndUpdate(repoertId, {
      $set: { userDeatialTable: userDetail._id },
    });

    res.status(201).json(new ApiResponse(201, userDetail._id));
  }
);

// Get all user details
export const getAllUserDetails = asyncHandler(
  async (_req: Request, res: Response) => {
    const userDetails = await UserDetail.find();

    res.status(200).json(new ApiResponse(200, userDetails));
  }
);

// Get a specific user detail by ID
export const getUserDetailById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "User detail ID is required");
    }

    const userDetail = await UserDetail.findById(id);

    if (!userDetail) {
      throw new ApiError(404, "User detail not found");
    }

    res.status(200).json(new ApiResponse(200, userDetail));
  }
);

// Update a user detail
export const updateUserDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { url, username } = req.body;

    if (!id) {
      throw new ApiError(400, "User detail ID is required");
    }

    await userDetailSchema.parseAsync({
      url,
      username,
    });

    const userDetail = await UserDetail.findByIdAndUpdate(
      id,
      {
        $set: {
          url,
          username,
        },
      },
      { new: true }
    );

    if (!userDetail) {
      throw new ApiError(404, "User detail not found");
    }

    res.status(200).json(new ApiResponse(200, userDetail._id));
  }
);

// Delete a user detail
export const deleteUserDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const repoertId = res.locals.report;
    if (!id) {
      throw new ApiError(400, "User detail ID is required");
    }

    const userDetail = await UserDetail.findByIdAndDelete(id);

    if (!userDetail) {
      throw new ApiError(404, "User detail not found");
    }

    await Report.findByIdAndUpdate(repoertId, {
      $set: { userDeatialTable: null },
    });

    res.status(200).json(new ApiResponse(200, userDetail._id));
  }
);

// Find user detail by username
export const findUserDetailByUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;

    if (!username) {
      throw new ApiError(400, "Username is required");
    }

    const userDetail = await UserDetail.findOne({ username });

    if (!userDetail) {
      throw new ApiError(404, "User detail not found");
    }

    res.status(200).json(new ApiResponse(200, userDetail));
  }
);
