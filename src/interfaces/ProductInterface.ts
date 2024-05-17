import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IIngredient {
  ingredientId: string;
  name: string;
  amount: number;
}

export interface IProduct {
  _id?: ObjectId;
  name: string;
  description: string;
  ingredients: IIngredient[];
  cost: number;
  createdAt: Date;
}

export type IProductDocument = IProduct & Document;

const productSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [
    {
      ingredientId: {
        type: Schema.Types.ObjectId,
        ref: "ingredients",
        required: true,
      },
      name: { type: String },
      amount: { type: Number, required: true },
    },
  ],
  cost: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProductModel = mongoose.model("products", productSchema);
