import { Types, Document, Model } from "mongoose";
import {
  CheckExistenceOptions,
  TokenPayload,
  OrderItemSubdocument,
} from "./types";
import { CustomError } from "./errors/CustomError";
import { SignOptions, sign } from "jsonwebtoken";
const isMongoID = (value: string): boolean => {
  return Types.ObjectId.isValid(value);
};
const findDocument = async <T extends Document>(
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

  const document = await ((db[model] as unknown) as Model<T>)
    .findOne(where || { [field]: value })
    .exec();

  if (!document) {
    throw new CustomError(
      message || `${model} with ${field} '${value}' not found!`,
      errorCode || "NOT_FOUND_ERROR",
      extensions,
    );
  }
  return document;
};

const issueToken = (payload: TokenPayload, options?: SignOptions): string =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: "2h", ...options });

const findOrderItem = (
  items: Types.DocumentArray<OrderItemSubdocument>,
  _id: string,
  operation: "update" | "delete",
): OrderItemSubdocument => {
  if (!isMongoID(_id)) {
    throw new CustomError(
      `Invalid ID value for '${_id}' in item ${operation} `,
      "INVALID_ID_ERROR",
    );
  }
  const item = items.id(_id);
  if (!item) {
    throw new CustomError(
      `Item with ID '${_id}' not found to ${operation}!`,
      "NOT_FOUND_ERROR",
    );
  }
  return item;
};
export { isMongoID, findDocument, issueToken, findOrderItem };
