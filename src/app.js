import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import realTimeProducts from "./routes/realTimeProductsRouter.js";
//import path from "path";
import express from "express";
import { ProductManager } from "./manager/productsManager.js";
//import {CartManager} from "./manager/cartsManager.js"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cartsRouter from"./routes/carts.router.js";
import productRouter from"./routes/productRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//const pathProducts = path.join(__dirname, "./src/data/products.json");
//const pathCarts = path.join(__dirname, "./src/data/carts.json");

//export const productManager = new ProductManager(pathProducts);
//export const cartManager = new CartManager(pathCarts);

//Middlewares
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`server runing o post ${PORT}`)
);
const socketServer = new Server(httpServer);
//Middleware
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/public"));

//Routes
app.use('/realTimeProducts', productRouter)
app.use('/', cartsRouter)

app.use("/", viewsRouter);
app.use("/realTimeProducts", realTimeProducts);
//estructura codigo handlebans_

app.engine("handlebars", handlebars.engine());
//tenemos que setear, debemos decir q nuestro views engines y la extencion de los archivo estan en handlebars._

app.set("view engine", "handlebars");
//luego decirles donde estan esos archivos_

app.set("views", __dirname +"/views");

//conexiion con socket.io_
socketServer.on("connection", (socket) => {
  console.log("Nueva conexion");
  try {
    const products = p.getProducts();
    socketServer.emit("products", products);
  } catch (error) {
    socketServer.emit("response", { status: "error", message: error.message });
  }

  socket.on("new-Product", async (newProduct) => {
    try {
      const Product = {
        title: newProduct.title,
        descripción: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        thumbnail: newProduct.thumbnail,
      };

      const pushNewProduct = await ProductManager.getInstance().addProduct(
        Product
      );
      const pushId = pushNewProduct.id;
      socketServer.emit("products", Product);
      socketServer.emit("responde", {
        status: "success",
        message: `product ${pushId}successfully added`,
      });
    } catch (error) {
      socketServer.emit("responde", {
        status: "error",
        message: error.message,
      });
    }
  });

  socket.on("delete-product", async (id) => {
    try {
      const pId = parseInt(id);
      await ProductManager.getInstance().deleteProduct(pId);
      const updatedList = await ProductManager.getInstance().getProduct();
      socketServer.emit("products", updatedList);
      socketServer.emit("responde", {
        status: "success",
        message: "Product delete successfully",
      });
    } catch (error) {
      socketServer.emit("responde", {
        status: "error",
        message: error.message,
      });
    }
  });
});
