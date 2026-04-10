import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true }, 
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },           
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] }         
},{
    collection: "PRODUCTS",
    timestamps: true 
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model("PRODUCTS", ProductSchema);