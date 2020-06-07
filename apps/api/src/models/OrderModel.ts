import { Schema, model } from "mongoose";
import { OrderDocument } from "../types";

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, useNestedStrict: true },
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "WAITING_PAYMENT",
        "IN_QUEUE",
        "PREPARING",
        "READY",
        "ON_THE_WAY",
        "DELIVERED",
      ],
      default: "WAITING_PAYMENT",
    },
    items: [orderItemSchema],
  },
  {
    timestamps: true,
  },
);

export default model<OrderDocument>("Order", orderSchema);
