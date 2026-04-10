import { CartModel } from "../models/cart-model.js";

class CartRepository {
    constructor(model) {
        this.model = model;
    }

    getCars = async () => {
        try {
            return await this.model.find({}).lean();
        } catch (error) {
            throw error;
        }
    };


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
    }

    // Delete api/carts/:cid/products/:pid Eliminar el producto Seleccionado

    delete_car_product = async (cid, pid) => {

        try {
            const cartId_pid = await this.model.findByIdAndUpdate(cid, {
                $pull:
                {
                    products:
                        { product: pid }
                }
            }
            )

            if (!cartId_pid) throw new Error("CID NOT FOUND")

            console.log(`Producto ${pid} Eliminado del Cart ${cid}`)

            return cartId_pid

        } catch (e) {
            throw e
        }

    }

    // Put api/carts/:cid  {
    //     "product": "69d87a512fd5b716b486c757",
    //     "quantity": 10
    // },
    add_products_cid = async (id, body) => {
        try {
            const cart = await this.model.findById(id);

            if (!cart) throw new Error("ID NOT FOUND");

            const existingProduct = cart.products.find(p =>
                p.product.toString() === body.product
            );

            if (existingProduct) {
                existingProduct.quantity += body.quantity;
            } else {
                cart.products.push(body);
            }

            return await cart.save();

        } catch (e) {
            console.error("Error en add_products_cid:", e.message);
            throw e;
        }
    }



    // PUT api/carts/:cid/products/:pid 

    add_quantity = async (cid, pid, body) => {

        try {
            const quantity_products = await this.model.findOneAndUpdate(
                { _id: cid, "products.product": pid },
                { $set: { "products.$.quantity": body.quantity } },
                { returnDocument: 'after', 
                runValidators: true}
            )
            if (!quantity_products) {
                // Si el carrito existe pero el producto NO está en el carrito, result será null
                throw new Error("El producto no existe en este carrito");
            }

            return quantity_products
        } catch (e) {
            throw e
        }
    }



    // DELETE api/carts/:cid

    delete_all_products = async (cid) => {
        try {
            const result = await this.model.findByIdAndUpdate(
                cid,
                { $set: { products: [] } },
                { new: true }
            );

            if (!result) throw new Error("CART_NOT_FOUND");

            return result;
        } catch (e) {
            throw e;
        }
    }

}




export const cartRepository = new CartRepository(CartModel);