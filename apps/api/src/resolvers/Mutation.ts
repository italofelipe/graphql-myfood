import {
  ProductCreateInput,
  ProductByIdInput,
  Resolver,
  ProductUpdateInput,
} from "../types";
import { checkExistence, isMongoID } from "../utils";

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
export default {
  createProduct,
  deleteProduct,
  updateProduct,
};
