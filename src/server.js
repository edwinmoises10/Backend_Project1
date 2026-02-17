//!BACKEND PROJECT 1

//?Imports
import express from "express";
import { productManager } from "./manager/productManager.js";
import { cartManager } from "./manager/cartManager.js";

//!CODE
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*EndPoints

app.get("/api/products/", (req, res) => {
  const getProducts = productManager.getProducts();
  res.status(200).json(getProducts);
});

app.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const idProduct = productManager.productByID(pid);
    res.status(200).json(idProduct);
  } catch (error) {
    if (error.message === "Product Not Found") {
      return res.status(404).json({
        error: error.message,
      });
    }
  }
});

app.post("/", (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

app.put("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const editProduct = productManager.editProduct(pid, req.body);
    res.status(200).json(editProduct);
  } catch (error) {
    if (error.message === "Product Not Found") {
      return res.status(404).json({
        error: error.message,
      });
    }

    return res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = productManager.deleteProduct(pid);
    res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

//!CART MANAGER

app.post("/api/carts/", (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/carts/:cid", (req, res) => {
  try {
    const { cid } = req.params;
    const getByID = cartManager.getCartByID(cid);
    res.status(200).json(getByID);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;

    const updateCart = cartManager.addItemsToCart(cid, pid);
    res.status(201).json(updateCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//!Main

app.get("/", (req, res) => {
  if (req.url === "/") {
    res.status(200).json("Welcomer to my DB");
  } else {
    res.status(400).json("Failed DB");
  }
});

//* Server Listened
app.listen(`${port}`, () =>
  console.log(`§Server OK Connected at Port ${port}`),
);
