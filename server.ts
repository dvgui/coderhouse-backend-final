import express from "express";

export const app = express();
import { createTables } from "./options/createTable.js";
createTables();

import { Server } from "http";

export const httpServer = new Server(app);
const io = require("./api/config/socket.js").init(httpServer);
import { base } from "./routers/baseRouter";
import { cartRouter, carts } from "./routers/cartRouter";
import { apiRouter } from "./routers/apiRouter";
import { logger, errorLogger } from "./api/config/logger";

import {
  newProductController,
  addCartController,
  newMessageController,
} from "./api/controllers/socketsController";

import {
  defaultPutController,
  defaultDeleteController,
  defaultPostController,
} from "./api/controllers/defaultController";

import compression from "compression";
import passport from "passport";
const cpus = require("os").cpus().length;
import { normalize } from "normalizr";

import messageSchema from "./models/messageSchema";

import { randomRouter } from "./routers/randomRouter";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoSession from "./api/config/mongoSession";
import argv from "./api/config/argv";
import productsApi from "./api/containers/productsDto";
import messagesApi from "./api/containers/messagesDto";

app.use("/cart", cartRouter);
app.use(cookieParser());
app.use(session(mongoSession));
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("views"));
app.use(express.static(__dirname + "./public/img"));
app.use("/public/img", express.static("./public/img"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("socketio", io);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", apiRouter);
app.use("/randomApi", randomRouter);
app.use(base);

io.on("connection", (socket, req) => {
  console.log("A client has connected");
  (async () => {
    let products = await productsApi.getAll();
    let normalizedMessages = await messagesApi.getAll();
    if (normalizedMessages !== []) {
      normalizedMessages.id = 1;
      normalizedMessages = normalize(normalizedMessages, messageSchema);
    }
    socket.emit("products", products);
    socket.emit("messages", normalizedMessages);
    socket.on("product", newProductController);
    socket.on("new-product", addCartController);
    socket.on("new-message", newMessageController);
  })();
});

app.get("/info", (req, res) => {
  res.render("info", {
    argv: argv,
    cpus: cpus,
    process: process,
    __dirname: __dirname,
    bytes: req.socket.bytesWritten,
  });
  logger.info(`${req.route.path} ${req.method}`, "info");
});

app.post("*", defaultPostController);
app.delete("*", defaultDeleteController);
app.put("*", defaultPutController);
