//!Import

import { v4 as uuidv4 } from "uuid";

//!Producs Manager

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  productSearchByID = (itemID) => {
    const prod_ID = this.products.find((e) => e.id === itemID);
    if (!prod_ID) throw new Error("Product Not Found");
    return prod_ID;
  };

  addProduct = (body) => {
    const produc = {
      id: uuidv4(),
      ...body,
    };

    //!TITLE
    if (!produc.title || typeof produc.title !== "string")
      throw new Error("Tittle is required");
    produc.title =
      produc.title.charAt(0).toUpperCase() +
      produc.title.slice(1).toLowerCase();

    //!DESCRIPTION
    if (!produc.description || typeof produc.description !== "string")
      throw new Error("Description is required");
    produc.description = produc.description.charAt(0).toUpperCase();

    //!PRICE
    if (typeof produc.price !== "number" || produc.price <= 0 )
      throw new Error("Price must be greater than 0");

    //!CODE VALIDATION
    const checkCode = this.products.find((c) => c.code === produc.code);
    if (checkCode) throw new Error("Duplicate product code");

    //!Stock
    if (typeof produc.stock !== "number" || produc.stock < 0 ) throw new Error("Stock cannot be less than 0");

    //!CATEGORY
    if (!produc.category || typeof produc.category !== "string") throw new Error("Category is required");

    //!STATUS
    if (typeof produc.status !== "boolean")
      throw new Error("Status is requiered True/False");
    this.products.push(produc);

    return produc;
  };

  editProduct = (id) => {
    const products = this.products;
    const editProduct = products.find((item) => item.id === id);
    if (!editProduct) throw new Error(`Product ${id} not found`);
  };

  deleteProduct = () => {
    this.products.length = 0;
    this.products = [];
  };
}

//! Create an Instance

const product = new ProductManager();

// product.addProduct({});

// product.addProduct({
//   title: "Adidas Shoes",
//   description: "Samba",
//   code: "qa1swsd",
//   price: 120.23,
//   status: true,
//   stock: 3,
//   category: "Sport",
//   ththumbnail: "Ruta Strings",
// });

// product.addProduct({
//   title: "Puma Shoes",
//   description: "Extreme",
//   code: "qa1swsd",
//   price: 110.23,
//   status: false,
//   stock: 5,
//   category: "Sport",
//   ththumbnail: "Ruta Strings",
// });

console.log(product.getProducts());
