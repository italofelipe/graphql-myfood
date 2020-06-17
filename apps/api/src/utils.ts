import { Types } from "mongoose";
import { CheckExistenceOptions, TokenPayload } from "./types";
import { CustomError } from "./errors/CustomError";
import { SignOptions, sign } from "jsonwebtoken";
const isMongoID = (value: string): boolean => {
  return Types.ObjectId.isValid(value);
};
const checkExistence = async (
  opts: CheckExistenceOptions,
): Promise<boolean> => {
  const {
    db,
    model,
    message,
    field,
    value,
    where,
    errorCode,
    extensions,
  } = opts;
  if (field === "_id" && !isMongoID(value)) {
    throw new CustomError(
      `Invalid ID value for '${value}'!`,
      "INVALID_ID_ERROR",
    );
  }

  const exists = await db[model].exists(where || { [field]: value });
  if (!exists) {
    throw new CustomError(
      message || `${model} with ${field} '${value}' not found!`,
      errorCode || "NOT_FOUND_ERROR",
      extensions,
    );
  }
  return exists;
};

const issueToken = (payload: TokenPayload, options?: SignOptions): string =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: "2h", ...options });
export { isMongoID, checkExistence, issueToken };
