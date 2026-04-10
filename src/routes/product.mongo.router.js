import { Router } from "express";
import { productRepository } from "../repositories/product_repository.js";
import { verifyProductInputs, verifyProductsModifier } from "../middleware/product.middleware.js";
import { ProductModel } from "../models/product-model.js"; 

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let { limit = 4, page = 1, sort, query } = req.query;

        const filter = query 
            ? { $or: [{ category: query }, { status: query === "true" }] } 
            : {};

        const options = {
            limit: 2,
            page: Number(page),
            lean: true, 
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
        };

        const result = await ProductModel.paginate(filter, options);

        const baseUrl = "/api/products";
        const queryParams = `&limit=${limit}&sort=${sort || ''}&query=${query || ''}`;

        res.status(200).json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}${queryParams}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}${queryParams}` : null
        });
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await productRepository.getById(id);
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.post("/", verifyProductInputs, async (req, res, next) => {
    try {
        const response = await productRepository.create(req.body);
        
        const io = req.app.get("socketServer");
        if (io) {
            const updatedList = await ProductModel.find().lean();
            io.emit("productList", updatedList);
        }

        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await productRepository.delete(id);

        const io = req.app.get("socketServer");
        if (io) {
            const updatedList = await ProductModel.find().lean();
            io.emit("productList", updatedList);
        }

        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

export default router;