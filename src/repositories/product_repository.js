import { ProductModel } from "../models/product-model.js";

class ProductRepository {
    constructor(model) {
        this.model = model;
    }

    getAll = async (filter = {}, options = {}) => {
        try {
            if (Object.keys(options).length > 0) {
                return await this.model.paginate(filter, options);
            }
            return await this.model.find(filter).lean();
        } catch (error) {
            throw error;
        }
    }

    getById = async (id) => {
        try { return await this.model.findById(id); } catch (error) { throw error; }
    }

    create = async (body) => {
        try {
            // CAMBIADO: .create() en lugar de .insertOne()
            return await this.model.create(body);
        } catch (error) {
            if (error.code === 11000) {
                error.message = `Código duplicado: '${body.code}'.`;
                error.statusCode = 409;
            }
            throw error;
        }
    }

    update = async (id, body) => {
        try {
            return await this.model.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        } catch (error) { throw error; }
    }

    delete = async (id) => {
        try { return await this.model.findByIdAndDelete(id); } catch (error) { throw error; }
    }
}

export const productRepository = new ProductRepository(ProductModel);