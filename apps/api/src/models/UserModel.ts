import { Schema, model } from "mongoose";
import { UserDocument } from "../types";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["ADMIN", "USER", "LOJA"],
    default: "USER",
  },
});

export default model<UserDocument>("User", userSchema);
