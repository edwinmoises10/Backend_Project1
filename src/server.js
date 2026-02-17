//!BACKEND PROJECT 1

//?Imports
import express from "express";
import { productManager } from "./manager/productManager.js";

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
    res.status(200).json(newProduct);
  } catch (error) {
    if (error.message === "Title is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Description is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Price must be greater than 0") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Duplicate product code") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Stock cannot be less than 0") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Category is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Status is Required True/False") {
      res.status(404).json({ error: error.message });
    }
  }
});

app.post("/api/products/:pid", (req, res) => {
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
    if (error.message === "Title is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Description is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Price must be greater than 0") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Code be required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Stock cannot be less than 0") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Category is required") {
      res.status(404).json({ error: error.message });
    }
    if (error.message === "Status is Required True/False") {
      res.status(404).json({ error: error.message });
    }
  }
});

// app.get("/", (req, res) => {
//   if (req.url === "/") {
//     res.status(200).json("Welcomer to my DB");
//   } else {
//     res.status(400).json("Failed DB");
//   }
// });

//* Server Listened
app.listen(`${port}`, () =>
  console.log(`§Server OK Connected at Port ${port}`),
);
