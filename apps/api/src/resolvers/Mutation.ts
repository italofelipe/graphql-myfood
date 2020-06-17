import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  ProductCreateInput,
  ProductByIdInput,
  Resolver,
  ProductUpdateInput,
  UserSignUpInput,
  UserSignInInput,
} from "../types";
import { checkExistence, isMongoID, issueToken } from "../utils";
import { CustomError } from "../errors/CustomError";

const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
  const { Product } = db;
  const { data } = args;
  const product = new Product(data);
  return product.save();
};
const deleteProduct: Resolver<ProductByIdInput> = async (_, args, { db }) => {
  const { Product } = db;
  const { _id } = args;
  await checkExistence({
    db,
    model: "Product",
    field: "_id",
    value: _id,
  });
  return Product.findByIdAndDelete(_id);
};

const updateProduct: Resolver<ProductUpdateInput> = async (_, args, { db }) => {
  const { Product } = db;
  const { _id, data } = args;
  const product = Product.findByIdAndUpdate(_id, data, { new: true });
  await checkExistence({
    db,
    model: "Product",
    field: "_id",
    value: _id,
  });
  return product;
};
const signin: Resolver<UserSignInInput> = async (_, args, { db }) => {
  const { User } = db;
  const { email, password } = args.data;
  const error = new CustomError(
    "Invalid Credentials!",
    "INVALID_CREDENTIALS_ERROR",
  );

  const user = await User.findOne({ email });
  if (!user) {
    throw error;
  }
  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw error;
  }
  const { _id: sub, role } = user;
  const token = issueToken({ sub, role });
  return { token, user };
};
const signup: Resolver<UserSignUpInput> = async (_, args, { db }) => {
  const { User } = db;
  const { data } = args;

  const password = await hash(data.password, 10);
  const user = await new User({
    ...data,
    password,
  }).save();

  const { _id: sub, role } = user;
  const token = issueToken({ sub, role });
  return { token, user };
};
export default {
  createProduct,
  deleteProduct,
  updateProduct,
  signup,
  signin,
};
