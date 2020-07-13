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

export interface ProductCreateArgs {
  data: OmitId<Product>; // Omitir o campo ID
}

export interface ProductByIdArgs {
  _id: string;
}

export interface ProductUpdateArgs extends ProductCreateArgs, ProductByIdArgs {}
