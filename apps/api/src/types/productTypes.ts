import { Document, Types } from "mongoose";
import { OmitId } from "./utilityTypes";

export interface Product {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface ProductDocument extends Product, Document {
  _id: Types.ObjectId;
}

export interface ProductCreateInput {
  data: OmitId<Product>; // Omitir o campo ID
}

export interface ProductByIdInput {
  _id: string;
}

export interface ProductUpdateInput
  extends ProductCreateInput,
    ProductByIdInput {}
