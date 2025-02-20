import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
  password: string;
  history: mongoose.Types.ObjectId[];
  generateAccessToken: () => string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "⚠️ Username is required"],
  },
  password: {
    type: String,
    required: [true, "⚠️ Password is required"],
  },
  history: {
    type: [mongoose.Schema.ObjectId],
    ref: "Report",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = Number(process.env.ACCESS_TOKEN_EXPIRY);
  try {
    if (!secret) {
      throw Error("No secrets found");
    }
    const options: SignOptions = { expiresIn: expiry as number };
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      secret,
      options
    );
    return token;
  } catch (error: any) {
    throw new Error(error + " in generateAccessToken");
  }
};

userSchema.methods.isPasswordCorrect = async function (
  mypassword: string
): Promise<boolean> {
  return await bcrypt.compare(mypassword, this.password);
};

export const User = mongoose.model("User", userSchema);
