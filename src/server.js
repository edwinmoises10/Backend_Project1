//!BACKEND PROJECT 1

//?Imports
import express from "express";

//!Router

import apiRouter from "./routes/index.js";

//!CODE
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//*EndPoints

app.use('/api', apiRouter);


//* Server Listened
app.listen(`${port}`, () =>
  console.log(`§Server OK Connected at Port ${port}`),
);
