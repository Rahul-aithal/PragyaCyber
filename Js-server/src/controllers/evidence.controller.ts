import Evidence from "../models/Evidences.model";
import VulnerabilityDetail from "../models/VulnerabilityDetail.model";
import evidenceType, { evidenceSchema } from "../types/evidence.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import { Request, Response } from "express";

export const createEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file?.path;
    const {
      desc,
      extra,
      name,
      vulnerabilityDetailId,
    }: evidenceType & { vulnerabilityDetailId: string } = req.body;
    await evidenceSchema.parseAsync({
      desc,
      name,
      file,
      extra,
    });

    if (!vulnerabilityDetailId) {
      throw new ApiError(400, "vulnerabilityDetailId not found");
    }

    const vulnerabilityDetail = await VulnerabilityDetail.findById(
      vulnerabilityDetailId
    );
    if (!vulnerabilityDetail) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }

    const evidence = await Evidence.create({
      desc,
      name,
      file,
      extra,
    });

    if (!evidence) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }

    vulnerabilityDetail.evidences.push(evidence._id);
    await vulnerabilityDetail.save();

    res.status(200).json(new ApiResponse(200, evidence._id));
  }
);

export const updateEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file?.path;
    const {
      desc,
      extra,
      name,
      vulnerabilityDetailId,
      evidenceId,
    }: evidenceType & { vulnerabilityDetailId: string; evidenceId: string } =
      req.body;
    await evidenceSchema.parseAsync({
      desc,
      name,
      file,
      extra,
    });

    if (!vulnerabilityDetailId) {
      throw new ApiError(400, "vulnerabilityDetailId not found");
    }
    if (!evidenceId) {
      throw new ApiError(400, "evidenceId not found");
    }

    const vulnerabilityDetail = await VulnerabilityDetail.findById(
      vulnerabilityDetailId
    );
    if (!vulnerabilityDetail) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }

    const evidence = await Evidence.findByIdAndUpdate(
      evidenceId,
      {
        $set: {
          desc,
          name,
          file,
          extra,
        },
      },
      {
        new: true,
      }
    );

    if (!evidence) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }

    res.status(200).json(new ApiResponse(200, evidence._id));
  }
);

export const deleteEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      evidenceId,
      vulnerabilityDetailId,
    }: { vulnerabilityDetailId: string; evidenceId: string } = req.body;

    if (!vulnerabilityDetailId) {
      throw new ApiError(400, "vulnerabilityDetailId not found");
    }
    if (!evidenceId) {
      throw new ApiError(400, "evidenceId not found");
    }

    const evidence = await Evidence.findByIdAndDelete(evidenceId);

    if (!evidence) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }
    const vulnerabilityDetail = await VulnerabilityDetail.findByIdAndUpdate(
      vulnerabilityDetailId,
      { $pull: { evidences: evidenceId } }
    );
    if (!vulnerabilityDetail) {
      throw new ApiError(404, "vulnerabilityDetail Doc not found");
    }

    res.status(200).json(new ApiResponse(200, evidence._id));
  }
);
