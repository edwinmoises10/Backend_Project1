//!Middleware Multer

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //* null indicando que no hay errores
    //*${process.cwd()}/src/public/images definir la ruta absoluta donde se guardara los archivos
    cb(null, `${process.cwd()}/src/public/images`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    //file.original.name Nombre original del archivo
    //cb propio de multer
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
