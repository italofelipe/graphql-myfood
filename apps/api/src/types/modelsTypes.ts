import { OrderDocument } from "./orderTypes";
import { Model } from "mongoose";
import { ProductDocument } from "./productTypes";
import { UserDocument } from "./userTypes";

export interface Models {
  Order: Model<OrderDocument>;
  Product: Model<ProductDocument>;
  User: Model<UserDocument>;
}
