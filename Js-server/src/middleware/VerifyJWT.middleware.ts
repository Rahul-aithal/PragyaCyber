import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandlers";
import { ApiError } from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User.model";

// Middleware for verifying JWT token
const verifyJWTToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken; // Assume token is stored in cookies

      if (!token) {
        throw new ApiError(401, "LOGIN OR  TOKEN IS REQUIRED");
      }

      // Verify the JWT token
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      // Find the user by ID from the decoded token
      const user = await User.findById(decodedToken._id).select(
        "-createdAt -updatedAt -refreshToken -password"
      );

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      // Store the user in res.locals, not req.locals
      res.locals.user = user as IUser;

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

export default verifyJWTToken;
