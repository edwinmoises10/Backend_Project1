import { CartModel } from "../models/cart-model.js";

class CartRepository {
    constructor(model) {
        this.model = model;
    }

    create = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            throw error;
        }
    };

    getById = async (cid) => {
        try {
            const cart = await this.model.findById(cid).populate("products.product");
            if (!cart) throw new Error("CART_NOT_FOUND");
            return cart;
        } catch (error) {
            throw error;
        }
    };

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) throw new Error("CART_NOT_FOUND");

            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === pid
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            return await cart.save();
        } catch (error) {
            throw error;
        }
    };
}

export const cartRepository = new CartRepository(CartModel);