import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ERRORS } from "../utils/errorDictionary.js";

class CartManager {
  constructor(path) {
    this.path = path;

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  getCartItems = () => {
    return fs.existsSync(this.path)
      ? JSON.parse(fs.readFileSync(this.path, `utf-8`))
      : [];
  };

  createCart = () => {
    const carts = this.getCartItems();

    const newCart = {
      id: uuidv4(),
      products: [],
    };

    carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(carts));
    return newCart;
  };

  getCartByID = (cid) => {
    const carts = this.getCartItems();

    const cartByID = carts.find((e) => e.id === cid);

    if (!cartByID) throw new Error(ERRORS.PRODUCT_NOT_FOUND);

    return cartByID;
  };

  addItemsToCart = (cid, pid) => {
    const carts = this.getCartItems();

    const cartIndex = carts.findIndex((e) => e.id === cid);
    if (cartIndex === -1) {
      throw new Error(ERRORS.CART_NOT_FOUND);
    }
    const productIndex = carts[cartIndex].products.findIndex(
      (e) => e.product === pid,
    );

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity++;
    } else {
      carts[cartIndex].products.push({
        product: pid,
        quantity: 1,
      });
    }
    fs.writeFileSync(this.path, JSON.stringify(carts));
    return carts[cartIndex];
  };
}

export const cartManager = new CartManager(`./data/carts.json`);
