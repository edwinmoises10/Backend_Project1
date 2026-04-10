import { Schema, model } from "mongoose";

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
    collection: "PRODUCTS"
});

export const ProductModel = model("PRODUCTS", ProductSchema);

