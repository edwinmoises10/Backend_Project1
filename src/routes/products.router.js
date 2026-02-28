import { Router } from "express";
import { productManager } from "../manager/productManager.js";
import { verifyProductInputs, verifyProductsModifier } from "../middleware/product.middleware.js";

const router = Router();

//*EndPoints

router.get("/", (req, res) => {
  const getProducts = productManager.getProducts();
  res.status(200).json(getProducts);
});

router.get("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const idProduct = productManager.productByID(pid);
    res.status(200).json(idProduct);
  } catch (error) {
    return res.status(422).json({
      error: error.message,
    });
  }
});

router.post("/", verifyProductInputs, (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(422).json({
      error: error.message,
    });
  }
});

router.put("/:pid", verifyProductsModifier, (req, res) => {
  try {
    const { pid } = req.params;
    const editProduct = productManager.editProduct(pid, req.body);
    res.status(200).json(editProduct);
  } catch (error) {
    return res.status(422).json({
      error: error.message,
    });
  }
});

router.delete("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = productManager.deleteProduct(pid);
    res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(422).json({
      error: error.message,
    });
  }
});

export default router;
