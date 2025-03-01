import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandlers";
import { ApiError } from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import Report, { ReportI } from "../models/Report.model";

// Middleware for verifying JWT token
const verifyReport = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.reportToekn; // Assume token is stored in cookies

      if (!token) {
        throw new ApiError(401, "Report Token is required");
      }

      // Verify the JWT token
      const decodedToken = jwt.verify(
        token,
        process.env.REPORT_TOKEN_SECRET!
      ) as JwtPayload;

      // Find the user by ID from the decoded token
      const report = await Report.findById(decodedToken._id).select("_id");

      if (!report) {
        throw new ApiError(401, "Invalid Report Token");
      }

      // Store the user in res.locals, not req.locals
      res.locals.report = report._id;

      // Continue to the next middleware or route handler
      next();
    } catch (err) {
      // Enhanced error handling for different JWT errors
      if (err instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Token has expired");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, "Invalid Token", [err.message]);
      } else {
        // Generic error for unexpected issues
        throw new ApiError(500, "Internal Server Error");
      }
    }
  }
);

export default verifyReport;
