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

interface UserSiginData {
  email: string;
  password: string;
}
export interface UserSignUpInput {
  data: UserSiginData & { name: string };
}
export interface UserSignInInput {
  data: UserSiginData;
}

export interface AuthUser {
  _id: Types.ObjectId;
  role: UserRole;
}
