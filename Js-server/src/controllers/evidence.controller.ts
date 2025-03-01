import Evidence from "../models/Evidences.model";
import VulnerabilityDetail from "../models/VulnerabilityDetail.model";
import evidenceType, { evidenceSchema } from "../types/evidence.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import { Request, Response } from "express";

//Creat Evidence using images and other text data
// Put the data into VulnerabilityDetials doc
export const createEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file?.path;
    const vulnerabilityDetailId = req.params["vulnerabilityDetailId"];
    const { desc, extra, name }: evidenceType = req.body;
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

//Find Evidence using id and update data
export const updateEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file?.path;
    const { evidenceId } = req.params;
    const { desc, extra, name }: evidenceType = req.body;
    await evidenceSchema.parseAsync({
      desc,
      name,
      file,
      extra,
    });

    if (!evidenceId) {
      throw new ApiError(400, "evidenceId not found");
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
      throw new ApiError(404, "evidenceId Doc not found");
    }

    res.status(200).json(new ApiResponse(200, evidence._id));
  }
);

//Delete Evidence using id
// Delete the _id from VulnerabilityDetials doc
export const deleteEvidence = asyncHandler(
  async (req: Request, res: Response) => {
    const { vulnerabilityDetailId, evidenceId } = req.params;

    if (!vulnerabilityDetailId) {
      throw new ApiError(400, "vulnerabilityDetailId not found");
    }
    if (!evidenceId) {
      throw new ApiError(400, "evidenceId not found");
    }

    const evidence = await Evidence.findByIdAndDelete(evidenceId);

    if (!evidence) {
      throw new ApiError(404, "evidence Doc not found");
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
