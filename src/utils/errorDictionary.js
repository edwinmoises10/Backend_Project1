export const ERRORS = {
  VALIDATION_FAILED: "Los datos enviados no cumplen con el formato requerido.",
  DUPLICATE_CODE: "El código del producto ya existe en el inventario.",
  PRODUCT_NOT_FOUND: "El producto solicitado no existe.",
  CART_NOT_FOUND: "El Carrito no existe",
};

export const zodErrors = (data) => {
  return `This Param Expected: ${data.expected || "N/A"} \nCode: ${data.code} \nPath: ${data.path} \nMessage: ${data.message} `;
};
