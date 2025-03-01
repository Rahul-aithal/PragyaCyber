import mongoose, { InferRawDocType } from "mongoose";

const ReportSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "⚠️ Company name is required"],
  },
  version: {
    type: String,
    required: [true, "⚠️ Version is required"],
  },
  author: {
    type: String,
    required: [true, "⚠️ Author is required"],
  },
  Comment: { type: String },
  date: {
    type: Date,
    required: [true, "⚠️ Date is required"],
  },
  targetScopeTable: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "TargetScopeSchema",
  },
  userDeatialTable: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "UserDetailSchema",
  },
  summary: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "UserDetailSchema",
  },
  securityTool: [
    {
      name: {
        type: String,
        required: [true, "⚠️ Tool name is required"],
      },
      desc: {
        type: String,
        required: [true, "⚠️ Tool description is required"],
      },
    },
  ],
  pieChart: {
    values: [
      {
        name: {
          enum: ["critical", "high", "medium", "low"],
        },
        value: {
          type: Number,
        },
      },
    ],
    image: {
      type: String,
    },
  },
  criticals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "VulnerabilityDetail",
  },
  highs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "VulnerabilityDetail",
  },

  mediums: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "VulnerabilityDetail",
  },

  lows: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "VulnerabilityDetail",
  },
  web: {
    type: Boolean,
    required: true,
    default: true,
  },
  api: {
    type: Boolean,
    required: true,
    default: false,
  },
  chatbot: {
    type: Boolean,
    required: true,
    default: false,
  },
  vulnerabilities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Vulnerability",
  },
  testPerfom: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "testPerfom",
  },
  conclusion: [
    {
      name: String,
      desc: String,
    },
  ],
});

const Report = mongoose.model("Report", ReportSchema);

export type ReportI = InferRawDocType<typeof ReportSchema>;

export default Report;
