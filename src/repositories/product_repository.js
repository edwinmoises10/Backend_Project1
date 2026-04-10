import { ProductModel } from "../models/product-model.js"


class ProductRepository {
    constructor(model) {
        this.model = model
    }

    getAll = async () => {
        try {
            //! retorna los valores encontrados en la collection "PRODUCTS"
            return await this.model.find()
        } catch (error) {
            throw error
        }
    }

    getById = async (id) => {
        try {
            //!Metodo de Mongo findById
            return await this.model.findById(id)
        } catch (error) {
            throw error
        }
    }

    create = async (body) => {
        try {
            // !InsertOne 
            return await this.model.insertOne(body)
        } catch (error) {
            if (error.code === 11000) {
                error.message = `Ya existe un producto con el código '${body.code}'. Por favor, usa uno diferente.`;
                error.statusCode = 409; 
            }

            if (error.name === "ValidationError") {
                error.message = "Los datos enviados no cumplen con el formato de la base de datos.";
                error.statusCode = 400; 
            }

            throw error;
        }
    }

    update = async (id, body) => {
        try {
            // !findOneAndUpdate()
            // !updateOne $set
            // ? new: true => nos devuelve el doc actualizado
            // ? runValidators: true mantener integridad de los datos!
            return await this.model.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }


    delete = async (id) => {
        try {
            // !deleteOne
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }
}

export const productRepository = new ProductRepository(ProductModel)

