import { ProductSchema } from "../schemas/product.schema.js";
import { zodErrors } from "../utils/errorDictionary.js";

export const verifyProductInputs = (req, res, next) => {
  const paramsValidation = ProductSchema.safeParse(req.body);
  if (!paramsValidation.success) {
    const checkError = paramsValidation.error.issues
      .map((e) => zodErrors(e))
      .join();
    console.log(checkError);
    

    return res.status(422).json(checkError);
  }
  next();
};
