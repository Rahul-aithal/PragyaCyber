import mongoose from "mongoose";




const UserDetailSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "⚠️ URL is required"],
  },
  username: {
    type: String,
    required: [true, "⚠️ Username is required"],
  },
});




export const UserDetail = mongoose.model(
    "UserDetail",
    UserDetailSchema
  );