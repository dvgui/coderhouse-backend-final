import express from "express";
const { Router } = express;

import { logger } from "../api/config/logger";

export const apiRouter = Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.get("/products-test", (req, res) => {
  res.render("testProducts", { products: "testProducts" });
  logger.info(`${req.route.path} ${req.method}`, "products-test");
});
