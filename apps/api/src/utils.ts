import { Types } from "mongoose";
import { CheckExistenceOptions } from "./types";
const isMongoID = (value: string): boolean => {
  return Types.ObjectId.isValid(value);
};
const checkExistence = async (
  opts: CheckExistenceOptions,
): Promise<boolean> => {
  const { db, model, message, field, value, where } = opts;
  if (field === "_id" && !isMongoID(value)) {
    throw new Error(`Invalid ID value for '${value}'!`);
  }

  const exists = await db[model].exists(where || { [field]: value });
  if (!exists) {
    throw new Error(message || `${model} with ${field} '${value}' not found!`);
  }
  return exists;
};

export { isMongoID, checkExistence };
