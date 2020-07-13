import { Schema, Document, Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  LOJA = "LOJA",
}

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
}

interface UserSignInInput {
  email: string;
  password: string;
}
export interface UserSignUpArgs {
  data: UserSignInInput & { name: string };
}
export interface UserSignInArgs {
  data: UserSignInInput;
}

export interface AuthUser {
  _id: Types.ObjectId;
  role: UserRole;
}
