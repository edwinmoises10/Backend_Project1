import { Router } from "express";
import { productManager } from "../manager/productManager.js";

const router = Router();

router.get("/main", (req, res) => {
  const products = productManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  const products = productManager.getProducts(); // ¡Importante! También aquí para el render inicial
  res.render("realTimeProducts", { products });
});

export default router;
