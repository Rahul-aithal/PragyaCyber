import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema({
  name: { type: String, req: true },
  image: { type: String, req: true },
  desc: { type: [String], req: false },
  extras: { type: [String], req: false },
});

const Evidence = mongoose.model("Evidence", evidenceSchema);

export default Evidence;
