//!Import

import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { ProductSchema } from "../schemas/product.schema.js";
import { ERRORS, zodErrors } from "../utils/errorDictionary.js";

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

    const paramsValidation = ProductSchema.safeParse(body);

    if (!paramsValidation.success) {
      const checkError = paramsValidation.error.issues
        .map((e) => zodErrors(e))
        .join();
      throw new Error(checkError);
    }

    const checkCode = products.some(
      (e) => e.code === paramsValidation.data.code,
    );
    if (checkCode) throw new Error(ERRORS.DUPLICATE_CODE);

    const product = {
      ...paramsValidation.data,
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

    const checkParams = ProductSchema.partial().safeParse(body);

    if (!checkParams.success) {
      const checkError = checkParams.error.issues
        .map((e) => zodErrors(e))
        .join();
      throw new Error(checkError);
    }

    const checkCode = products.some(
      (e) => e.code === checkParams.data.code,
    );

    if (checkCode) throw new Error(ERRORS.DUPLICATE_CODE);

    const { id } = prod_ID; //!Mantengo ID original !!

    const product = { ...prod_ID, ...checkParams.data, id: id };

    const findIndex = products.findIndex((i) => i.id === id);
    products[findIndex] = product;
    fs.writeFileSync(this.path, JSON.stringify(products));
    return product;
  };

  deleteProduct = (id) => {
    const products = this.getProducts();

    const removalIndex = products.findIndex((i) => i.id === id);

    if (removalIndex === -1) throw new Error("Product not found");

    products.splice(removalIndex, 1);
    fs.writeFileSync(this.path, JSON.stringify(products));
  };
}

//! Create an Instance

export const productManager = new ProductManager(`./data/products.json`);

// product.addProduct({
//   title: "Adidas",
//   description: "Jordan Air",
//   code: "xla23",
//   price: 100.2,
//   status: true,
//   stock: 10,
//   category: "Casual",
//   thumbnails: "PICIMG",
// });
// product.editProduct("7814ff77-2990-445d-a0dd-9d1a1267d6f3", { price: 300, category: "Sport TC" });

// console.log(product.productByID("7814ff77-2990-445d-a0dd-9d1a1267d6f3"));
