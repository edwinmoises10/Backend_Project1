//!BACKEND PROJECT 1

//?Imports
import express from "express";
import handlebars from "express-handlebars";
import viewRouter from "./routes/view.router.js"

//!CODE
const app = express();
const port = 8081;


//!Router

import apiRouter from "./routes/index.js";

//!handleBars

app.engine("handlebars", handlebars.engine());
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//!Multer
app.use(express.static(`${process.cwd()}/src/public`));

//*EndPoints

app.use("/api", apiRouter);
app.use("/", viewRouter)

//* Server Listened
app.listen(`${port}`, () =>
  console.log(`§Server OK Connected at Port ${port}`),
);
