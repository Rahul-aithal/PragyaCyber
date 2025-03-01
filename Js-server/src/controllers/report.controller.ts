import { Request, Response } from "express";
import Report from "../models/Report.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandlers";
import reportType, {
  pieChartSchema,
  pieChartType,
  reportSchema,
} from "../types/report.type";
import jwt, { SignOptions } from "jsonwebtoken";
// Create a new report
export const createReport = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      companyName,
      version,
      author,
      comment,
      date,
      summary,
      securityTool,
      web,
      api,
      chatbot,
    }: reportType = req.body;

    // Validate request body against schema
    await reportSchema.parseAsync({
      companyName,
      version,
      author,
      date,
      securityTool,
      web,
      api,
      chatbot,
      comment,
    });

    const report = await Report.create({
      companyName,
      version,
      author,
      Comment,
      date,
      summary,
      securityTool,

      web,
      api,
      chatbot,
    });

    if (!report) {
      throw new ApiError(500, "Failed to create report");
    }

    const cookieOptions = {
      httpOnly: false,
      secure: true,
      path: "/",
      sameSite: "none" as "strict" | "lax" | "none",
    };

    const secret = process.env.REPORT_TOKEN_SECRET;
    const expiry = Number(process.env.REPORT_TOKEN_EXPIRY);

    if (!secret) {
      throw Error("No secrets found");
    }
    const options: SignOptions = { expiresIn: expiry as number };
    const token = jwt.sign(
      {
        _id: report._id,
      },
      secret,
      options
    );
    res
      .cookie("reportToken", token, cookieOptions)
      .status(201)
      .json(new ApiResponse(201, report, "Report created successfully"));
  }
);

// Get all reports
export const getAllReports = asyncHandler(
  async (_req: Request, res: Response) => {
    const reports = await Report.find().sort({ date: -1 });

    if (!reports || reports.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No reports found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, reports, "Reports retrieved successfully"));
  }
);

// Get report by ID
export const getReportById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    const report = await Report.findById(id);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, report, "Report retrieved successfully"));
  }
);

// Update report by ID
export const updateReport = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    const {
      companyName,
      version,
      author,
      Comment,
      date,
      summary,
      securityTool,
      pieChart,
      web,
      api,
      chatbot,
      conclusion,
    } = req.body;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    // Validate required fields if they are provided
    const updateData = {
      ...(companyName && { companyName }),
      ...(version && { version }),
      ...(author && { author }),
      ...(Comment !== undefined && { Comment }),
      ...(date && { date }),
      ...(summary !== undefined && { summary }),
      ...(securityTool && { securityTool }),
      ...(pieChart && { pieChart }),
      ...(web !== undefined && { web }),
      ...(api !== undefined && { api }),
      ...(chatbot !== undefined && { chatbot }),
      ...(conclusion && { conclusion }),
    };

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedReport) {
      throw new ApiError(404, "Report not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedReport, "Report updated successfully"));
  }
);

// Delete report by ID
export const deleteReport = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      throw new ApiError(404, "Report not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, deletedReport._id, "Report deleted successfully")
      );
  }
);

// Add a security tool to a report
export const addSecurityTool = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    const { name, desc } = req.body;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    if (!name || !desc) {
      throw new ApiError(400, "Tool name and description are required");
    }

    const report = await Report.findById(id);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    report.securityTool.push({ name, desc });
    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Security tool added successfully"));
  }
);

// Update a security tool in a report
export const updateSecurityTool = asyncHandler(
  async (req: Request, res: Response) => {
    const { reportId, toolId } = req.params;
    const { name, desc } = req.body;

    if (!reportId || !toolId) {
      throw new ApiError(400, "Report ID and Tool ID are required");
    }

    const report = await Report.findById(reportId);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    const toolIndex = report.securityTool.findIndex(
      (tool) => tool._id.toString() === toolId
    );

    if (toolIndex === -1) {
      throw new ApiError(404, "Security tool not found in this report");
    }

    if (name) report.securityTool[toolIndex].name = name;
    if (desc) report.securityTool[toolIndex].desc = desc;

    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Security tool updated successfully"));
  }
);

// Delete a security tool from a report
export const deleteSecurityTool = asyncHandler(
  async (req: Request, res: Response) => {
    const { reportId, toolId } = req.params;

    if (!reportId || !toolId) {
      throw new ApiError(400, "Report ID and Tool ID are required");
    }

    const report = await Report.findById(reportId);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    const toolIndex = report.securityTool.findIndex(
      (tool) => tool._id.toString() === toolId
    );

    if (toolIndex === -1) {
      throw new ApiError(404, "Security tool not found in this report");
    }

    report.securityTool.splice(toolIndex, 1);
    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Security tool deleted successfully"));
  }
);

// Update pie chart data in a report
export const updatePieChart = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    const { values }: pieChartType = req.body;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    await pieChartSchema.parseAsync({ values });

    const report = await Report.findByIdAndUpdate(id);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    report.pieChart?.values.push(values);
    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Pie chart updated successfully"));
  }
);

// Add a conclusion to a report
export const addConclusion = asyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.report;

    const { name, desc } = req.body;

    if (!id) {
      throw new ApiError(400, "Report ID is required");
    }

    if (!name || !desc) {
      throw new ApiError(400, "Conclusion name and description are required");
    }

    const report = await Report.findById(id);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    report.conclusion.push({ name, desc });
    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Conclusion added successfully"));
  }
);

// Update a conclusion in a report
export const updateConclusion = asyncHandler(
  async (req: Request, res: Response) => {
    const { reportId, conclusionId } = req.params;
    const { name, desc } = req.body;

    if (!reportId || !conclusionId) {
      throw new ApiError(400, "Report ID and Conclusion ID are required");
    }

    const report = await Report.findById(reportId);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    const conclusionIndex = report.conclusion.findIndex(
      (item) => item._id.toString() === conclusionId
    );

    if (conclusionIndex === -1) {
      throw new ApiError(404, "Conclusion not found in this report");
    }

    if (name) report.conclusion[conclusionIndex].name = name;
    if (desc) report.conclusion[conclusionIndex].desc = desc;

    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Conclusion updated successfully"));
  }
);

// Delete a conclusion from a report
export const deleteConclusion = asyncHandler(
  async (req: Request, res: Response) => {
    const { reportId, conclusionId } = req.params;

    if (!reportId || !conclusionId) {
      throw new ApiError(400, "Report ID and Conclusion ID are required");
    }

    const report = await Report.findById(reportId);

    if (!report) {
      throw new ApiError(404, "Report not found");
    }

    const conclusionIndex = report.conclusion.findIndex(
      (item) => item._id.toString() === conclusionId
    );

    if (conclusionIndex === -1) {
      throw new ApiError(404, "Conclusion not found in this report");
    }

    report.conclusion.splice(conclusionIndex, 1);
    await report.save();

    res
      .status(200)
      .json(new ApiResponse(200, report, "Conclusion deleted successfully"));
  }
);

// Get reports with application types statistics
export const getReportsStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await Report.aggregate([
      {
        $group: {
          _id: null,
          totalReports: { $sum: 1 },
          webApps: { $sum: { $cond: ["$web", 1, 0] } },
          apiApps: { $sum: { $cond: ["$api", 1, 0] } },
          chatbotApps: { $sum: { $cond: ["$chatbot", 1, 0] } },
        },
      },
    ]);

    if (!stats || stats.length === 0) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            totalReports: 0,
            webApps: 0,
            apiApps: 0,
            chatbotApps: 0,
          },
          "No reports statistics found"
        )
      );
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          stats[0],
          "Report statistics retrieved successfully"
        )
      );
  }
);
