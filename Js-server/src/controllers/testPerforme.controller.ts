import Report from "../models/Report.model";
import TestPerformed from "../models/TestPerformed.model";
import testPerformedType, {
  stepSchema,
  testPerformedSchema,
} from "../types/testPerformed.type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import { Request, Response } from "express";

export const createTestPerformed = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, step }: testPerformedType = req.body;
    const reportId = res.locals.report._id;
    await testPerformedSchema.parseAsync({
      name,
      step,
    });

    const testPerformed = await TestPerformed.create({
      name,
      step,
    });

    if (!testPerformed) {
      throw new ApiError(500, "Failed to create test performed document");
    }

    await Report.findByIdAndUpdate(reportId, {
      $push: {
        testPerfom: testPerformed._id,
      },
    });

    res.status(201).json(new ApiResponse(201, testPerformed._id));
  }
);

export const updateTestPerformed = asyncHandler(
  async (req: Request, res: Response) => {
    const { testPerformedId } = req.params;
    const { name, step } = req.body;

    await testPerformedSchema.parseAsync({
      name,
      step,
    });

    if (!testPerformedId) {
      throw new ApiError(400, "testPerformedId not found");
    }

    const testPerformed = await TestPerformed.findByIdAndUpdate(
      testPerformedId,
      {
        $set: {
          name,
          step,
        },
      },
      {
        new: true,
      }
    );

    if (!testPerformed) {
      throw new ApiError(404, "Test performed document not found");
    }

    res.status(200).json(new ApiResponse(200, testPerformed));
  }
);

export const deleteTestPerformed = asyncHandler(
  async (req: Request, res: Response) => {
    const { testPerformedId } = req.params;

    if (!testPerformedId) {
      throw new ApiError(400, "testPerformedId not found");
    }

    const testPerformed = await TestPerformed.findByIdAndDelete(
      testPerformedId
    );

    if (!testPerformed) {
      throw new ApiError(404, "Test performed document not found");
    }

    res.status(200).json(new ApiResponse(200, testPerformed._id));
  }
);

export const getTestPerformed = asyncHandler(
  async (req: Request, res: Response) => {
    const { testPerformedId } = req.params;

    if (!testPerformedId) {
      throw new ApiError(400, "testPerformedId not found");
    }

    const testPerformed = await TestPerformed.findById(testPerformedId);

    if (!testPerformed) {
      throw new ApiError(404, "Test performed document not found");
    }

    res.status(200).json(new ApiResponse(200, testPerformed));
  }
);

export const getAllTestPerformed = asyncHandler(
  async (_req: Request, res: Response) => {
    const testPerformeds = await TestPerformed.find();

    res.status(200).json(new ApiResponse(200, testPerformeds));
  }
);

export const addStep = asyncHandler(async (req: Request, res: Response) => {
  const { testPerformedId } = req.params;
  const { name, pass, fail, noAns } = req.body;

  await stepSchema.parseAsync({
    name,
    pass,
    fail,
    noAns,
  });

  if (!testPerformedId) {
    throw new ApiError(400, "testPerformedId not found");
  }

  const testPerformed = await TestPerformed.findByIdAndUpdate(
    testPerformedId,
    {
      $push: {
        step: {
          name,
          pass: pass || false,
          fail: fail || false,
          noAns: noAns || false,
        },
      },
    },
    { new: true }
  );

  if (!testPerformed) {
    throw new ApiError(404, "Test performed document not found");
  }

  res.status(200).json(new ApiResponse(200, testPerformed));
});

export const updateStep = asyncHandler(async (req: Request, res: Response) => {
  const { testPerformedId, stepIndex } = req.params;
  const { name, pass, fail, noAns } = req.body;

  await stepSchema.parseAsync({
    name,
    pass,
    fail,
    noAns,
  });

  if (!testPerformedId) {
    throw new ApiError(400, "testPerformedId not found");
  }

  if (!stepIndex || isNaN(parseInt(stepIndex))) {
    throw new ApiError(400, "Invalid step index");
  }

  const index = parseInt(stepIndex);
  const updateData: { [key: string]: any } = {};

  if (name !== undefined) updateData[`step.${index}.name`] = name;
  if (pass !== undefined) updateData[`step.${index}.pass`] = pass;
  if (fail !== undefined) updateData[`step.${index}.fail`] = fail;
  if (noAns !== undefined) updateData[`step.${index}.noAns`] = noAns;

  const testPerformed = await TestPerformed.findByIdAndUpdate(
    testPerformedId,
    { $set: updateData },
    { new: true }
  );

  if (!testPerformed) {
    throw new ApiError(404, "Test performed document not found");
  }

  res.status(200).json(new ApiResponse(200, testPerformed));
});

export const removeStep = asyncHandler(async (req: Request, res: Response) => {
  const { testPerformedId, stepIndex } = req.params;

  if (!testPerformedId) {
    throw new ApiError(400, "testPerformedId not found");
  }

  if (!stepIndex || isNaN(parseInt(stepIndex))) {
    throw new ApiError(400, "Invalid step index");
  }

  const index = parseInt(stepIndex);

  // First, get the document to check if the step exists
  const testDoc = await TestPerformed.findById(testPerformedId);

  if (!testDoc) {
    throw new ApiError(404, "Test performed document not found");
  }

  if (!testDoc.step || index >= testDoc.step.length) {
    throw new ApiError(404, "Step not found at specified index");
  }

  // Remove the step at the specified index
  const testPerformed = await TestPerformed.findByIdAndUpdate(
    testPerformedId,
    { $pull: { step: { $position: index } } },
    { new: true }
  );

  if (!testPerformed) {
    throw new ApiError(404, "No testPerformed doc found ");
  }

  res.status(200).json(new ApiResponse(200, testPerformed));
});
