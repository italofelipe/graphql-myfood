import { Schema, Document } from "mongoose";

export enum UserRole {
  ADMIN,
  USER,
  LOJA,
}

export interface User {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends User, Document {
  _id: Schema.Types.ObjectId;
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
  _id: Schema.Types.ObjectId;
  role: UserRole;
}
