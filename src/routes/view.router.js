import { Router } from "express";
import { productRepository } from "../repositories/product_repository.js";
import { ProductModel } from "../models/product-model.js";

const router = Router();

router.get("/home", async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.render("home", { products });
  } catch (error) {
    res.status(500).render("error", { message: "Error al obtener productos" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).render("error", { message: "Error al obtener productos" });
  }
});

router.get("/products", async (req, res) => {
  try {
      const { page = 1, limit = 4 } = req.query;
      const result = await ProductModel.paginate({}, { page: Number(page), limit: Number(limit), lean: true });

      res.render("products", {
          products: result.docs,
          totalPages: result.totalPages,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          page: result.page,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage
      });
  } catch (error) {
      res.status(500).send("Error al cargar productos");
  }
});

export default router;