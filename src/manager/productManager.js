//!Import

import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ERRORS } from "../utils/errorDictionary.js";

//!Producs Manager

class ProductManager {
  constructor(filePath) {
    this.path = filePath;

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  getProducts = () => {
    return fs.existsSync(this.path)
      ? JSON.parse(fs.readFileSync(this.path, "utf-8"))
      : [];
  };

  productByID = (itemID) => {
    const products = this.getProducts();
    const prod_ID = products.find((e) => e.id === itemID);
    if (!prod_ID) throw new Error(ERRORS.PRODUCT_NOT_FOUND);
    return prod_ID;
  };

  addProduct = (body) => {
    const products = this.getProducts();

    const checkCode = products.some((e) => e.code === body.code);
    if (checkCode) throw new Error(ERRORS.DUPLICATE_CODE);

    const product = {
      ...body,
      id: uuidv4(),
    };

    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return product;
  };

  editProduct = (idProduct, body) => {
    const products = this.getProducts();

    const prod_ID = products.find((e) => e.id === idProduct);
    if (!prod_ID) throw new Error(ERRORS.PRODUCT_NOT_FOUND);

    // const checkCode = products.some((e) => e.code === body.code);

    // if (checkCode) throw new Error(ERRORS.DUPLICATE_CODE);

    const { id } = prod_ID; //!Mantengo ID original !!

    const product = { ...prod_ID, ...body, id: id };

    const findIndex = products.findIndex((i) => i.id === id);
    products[findIndex] = product;
    fs.writeFileSync(this.path, JSON.stringify(products));
    return product;
  };

  deleteProduct = (id) => {
    const products = this.getProducts();
    const removalIndex = products.findIndex((i) => i.id === id);
    if (removalIndex === -1) throw new Error(ERRORS.PRODUCT_NOT_FOUND);
    products.splice(removalIndex, 1);
    fs.writeFileSync(this.path, JSON.stringify(products));
  };
}

//! Create an Instance
export const productManager = new ProductManager(`./data/products.json`);
