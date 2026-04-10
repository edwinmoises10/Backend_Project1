//!BACKEND PROJECT 1
import 'dotenv/config'

//?Imports
import express from "express";
import handlebars from "express-handlebars";
import viewRouter from "./routes/view.router.js";
import productMongoRouter from "./routes/product.mongo.router.js"
import carMongoRouter from "./routes/cart.mongo.router.js"

//!Router

import apiRouter from "./routes/index.js";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/db.connections.js";

//!CODE
const app = express();
const PORT = process.env.PORT;



//!handleBars

app.engine("handlebars", handlebars.engine());
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");

// !Clave para el uso de Router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!Multer
app.use(express.static(`${process.cwd()}/src/public`));
//*EndPoints

//!Conexion con los route ... 
app.get("/ping", (req, res) => res.send("pong"));

app.use("/api/products", productMongoRouter); 
app.use("/api/carts", carMongoRouter);

app.use("/api", apiRouter);

app.use("/", viewRouter);



//* Server Listened
const serverHttp = app.listen(`${PORT}`, () =>
  console.log(`Server OK Connected at Port ${PORT}`),
);
// !Socket Part
const socketServer = new Server(serverHttp);
socketServer.on("connection", (socket) => {
  console.log(`Cliente Conectado ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`logout ${socket.id}`);

  })
});

app.set("socketServer", socketServer);

//!MongoDB 

connectMongoDB().then(() => console.log("Conexion Exitosa a Mongo DB")).catch((e) => console.log(`Error al Conectar a Mongo DB ${e.message}`))
