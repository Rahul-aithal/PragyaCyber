import mongoose from "mongoose";

const testPerformedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  step: [
    {
      name: { type: String },
      pass: { type: Boolean, required: true, default: false },
      fail: { type: Boolean, required: true, default: false },
      noAns: { type: Boolean, required: true, default: false },
    },
  ],
});

const TestPerformed = mongoose.model("TestPerformed", testPerformedSchema);

export default TestPerformed