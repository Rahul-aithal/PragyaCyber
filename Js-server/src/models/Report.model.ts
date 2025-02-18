import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "⚠️ Company name is required"],
  },
  version: {
    type: String,
    required: [true, "⚠️ Version is required"],
  },
  Author: {
    type: String,
    required: [true, "⚠️ Author is required"],
  },
  Comment: { type: String },
  Date: {
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
          type: String,
        },
        value: {
          type: Number,
        },
      },
    ],
    // image: {
    //   type: String,
    // },
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

  low: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "VulnerabilityDetail",
  },
  web: {
    type: Boolean,
    required: true,
    default: false,
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
    type: Array,
  },
  testPerfom: {
    type: Array,
  },
  conclusion: [
    {
      name: String,
      desc: String,
    },
  ],
});

export const Report = mongoose.model("Report", ReportSchema);
