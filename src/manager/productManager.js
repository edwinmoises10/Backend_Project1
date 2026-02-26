//!Import

import { v4 as uuidv4 } from "uuid";
import fs from "fs";

//!Producs Manager

class ProductManager {
  constructor(filePath) {
    // this.products = [];
    this.path = filePath;
  }

  getProducts = () => {
    if (fs.existsSync(this.path)) {
      const productFile = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(productFile);
    } else {
      return [];
    }
  };

  productByID = (itemID) => {
    const products = this.getProducts();

    const prod_ID = products.find((e) => e.id === itemID);
    if (!prod_ID) throw new Error("Product Not Found in DB");
    return prod_ID;
  };

  addProduct = (body) => {
    const products = this.getProducts();

    const product = {
      ...body,
      id: uuidv4(),
    };

    //!TITLE
    if (!product.title || typeof product.title !== "string")
      throw new Error("Title is required");
    product.title =
      product.title.charAt(0).toUpperCase() + product.title.slice(1);

    //!DESCRIPTION
    if (!product.description || typeof product.description !== "string")
      throw new Error("Description is required");
    product.description =
      product.description.charAt(0).toUpperCase() +
      product.description.slice(1);

    //!PRICE
    if (
      typeof product.price !== "number" ||
      Number.isNaN(product.price) ||
      product.price <= 0
    )
      throw new Error("Price must be greater than 0");

    //!CODE VALIDATION
    const checkCode = products.find((c) => c.code === product.code);
    if (checkCode) throw new Error("Duplicate product code");

    //!Stock
    if (typeof product.stock !== "number" || product.stock < 0)
      throw new Error("Stock cannot be less than 0");

    //!CATEGORY
    if (!product.category || typeof product.category !== "string")
      throw new Error("Category is required");

    //!STATUS
    if (typeof product.status !== "boolean")
      throw new Error("Status is Required True/False");

    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return product;
  };

  editProduct = (idProduct, body) => {
    const products = this.getProducts();

    const prod_ID = products.find((e) => e.id === idProduct);
    if (!prod_ID) throw new Error("Product Not Found");

    if (body.title !== undefined) {
      if (!body.title || typeof body.title !== "string")
        throw new Error("Title is required");
      body.title = body.title.charAt(0).toUpperCase() + body.title.slice(1);
    }

    //!DESCRIPTION

    if (body.description !== undefined) {
      if (!body.description || typeof body.description !== "string")
        throw new Error("Description is required");
      body.description =
        body.description.charAt(0).toUpperCase() + body.description.slice(1);
    }

    //!PRICE
    if (body.price !== undefined) {
      if (
        !body.price ||
        typeof body.price !== "number" ||
        Number.isNaN(body.price) ||
        body.price <= 0
      )
        throw new Error("Price must be greater than 0");
    }

    //!CODE

    if (body.code !== undefined) {
      if (!body.code || typeof body.code !== "string")
        throw new Error("Code be required");
    }

    //!Stock
    if (body.stock !== undefined) {
      if (!body.stock || typeof body.stock !== "number" || body.stock < 0)
        throw new Error("Stock cannot be less than 0");
    }

    //!CATEGORY

    if (body.category !== undefined) {
      if (typeof body.category !== "string")
        throw new Error("Category is required");
    }

    //!STATUS
    if (body.status !== undefined) {
      if (typeof body.status !== "boolean")
        throw new Error("Status is Required True/False");
    }

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

    if (removalIndex === -1) throw new Error("Product not found");

    products.splice(removalIndex, 1);
    fs.writeFileSync(this.path, JSON.stringify(products));
  };
}

//! Create an Instance

<<<<<<< HEAD
export const productManager = new ProductManager(`../data/products.json`);

productManager.getProducts()
=======
export const productManager = new ProductManager(`./products.json`);

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
>>>>>>> a73b9d462ab83be1b217787c5f945ce8b99b4644
