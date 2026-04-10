import { ProductSchema } from "../schemas/product.schema.js";
import { zodErrors } from "../utils/errorDictionary.js";

export const verifyProductInputs = (req, res, next) => {
  const paramsValidation = ProductSchema.safeParse(req.body);
  if (!paramsValidation.success) {
    const checkError = paramsValidation.error.issues
      .map((e) => ({
        path: e.path[0],
        message: zodErrors(e)
      }))

    return res.status(422).json({
      status: "error",
      errors: checkError // Esto devuelve un array de objetos claro
    })
  }
  next();
};

export const verifyProductsModifier = (req, res, next) => {
  const checkParams = ProductSchema.partial().safeParse(req.body);
  if (!checkParams.success) {
    const checkError = checkParams.error.issues.map((e) => zodErrors(e)).join();
    return res.status(422).json(checkError);
  }

  next();
};
