import mongoose from "mongoose";

const TargetScopeSchema = new mongoose.Schema({
  applicationType: {
    type: String,
    required: [true, "⚠️ Application type is required"],
  },
  address: {
    type: String,
    required: [true, "⚠️ Address is required"],
  },
});

const TargetScope = mongoose.model("TargetScope", TargetScopeSchema);

export default TargetScope;
