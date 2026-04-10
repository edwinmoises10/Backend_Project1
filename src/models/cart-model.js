import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "PRODUCTS", 
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            _id: false 
        }
    ]
}, {
    collection: "CARTS",
    timestamps: true
});

export const CartModel = model("CARTS", CartSchema);