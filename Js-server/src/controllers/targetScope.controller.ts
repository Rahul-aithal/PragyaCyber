import Report from "../models/Report.model";
import TargetScope from "../models/TargetScope.model";
import targetScopeType, { targetScopeSchema } from "../types/targetScope.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import { Request, Response } from "express";

//Create Target Scope with addrees and application type
// Insert the id of target scope into Report
export const createTargetScope = asyncHandler(
  async (req: Request, res: Response) => {
    const { address, applicationType }: targetScopeType = req.body;
    await targetScopeSchema.parseAsync({
      address,
      applicationType,
    });
    const reportId = res.locals.report;
    const targetScope = await TargetScope.create({
      address,
      applicationType,
    });

    if (!targetScope) {
      throw new ApiError(404, "targetScope Doc not found");
    }

    await Report.findByIdAndUpdate(reportId, {
      $set: { targetScopeTable: targetScope._id },
    });

    res.status(200).json(new ApiResponse(200, targetScope._id));
  }
);

//Update Target Scope using id
export const updateTargetScope = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { address, applicationType }: targetScopeType = req.body;
    await targetScopeSchema.parseAsync({
      address,
      applicationType,
    });

    if (!id) {
      throw new ApiError(400, "target scope id not found");
    }

    const targetScope = await TargetScope.findByIdAndUpdate(
      id,
      {
        $set: {
          address,
          applicationType,
        },
      },
      {
        new: true,
      }
    );

    if (!targetScope) {
      throw new ApiError(404, "targetScope Doc not found");
    }

    res.status(200).json(new ApiResponse(200, targetScope._id));
  }
);

//Delete Target Scope using id
// Remove the id of target scope into Report
export const deleteETargetScope = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const reportId = res.locals.report;
    if (!id) {
      throw new ApiError(400, "target Scope id not found");
    }

    const targetScope = await TargetScope.findByIdAndDelete(id);

    if (!targetScope) {
      throw new ApiError(404, "targetScope Doc not found");
    }

    await Report.findByIdAndUpdate(reportId, {
      $set: { targetScopeTable: null },
    });

    res.status(200).json(new ApiResponse(200, targetScope._id));
  }
);

//Get total Application Types
export const getTotalApplicationType = asyncHandler(
  async (req: Request, res: Response) => {
    const targetScope = await TargetScope.find().select("applicationType");
    res.status(200).json(new ApiResponse(200, targetScope));
  }
);
