import express from "express";
const { Router } = express;

import {
  postProductController,
  getProductController,
  putProductController,
  deleteProductController,
} from "../api/controllers/productController";
import {
  homepageController,
  logoutController,
  getLoginController,
  postRegisterController,
  getRegisterController,
  postLoginController,
  getSignInErrorController,
  getLogoutController,
} from "../api/controllers/authController";

import {
  getBuyController,
  postBuyController,
} from "../api/controllers/buyController";

import passport from "passport";
export const base = Router();

base.use(express.json());
base.use(express.urlencoded({ extended: true }));

base.post("/products", postProductController);
base.put("/products/:id", putProductController);
base.get("/products", getProductController);

base.post("/register", postRegisterController);
base.get("/register", getRegisterController);
base.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/signinError",
  }),
  postLoginController
);
base.get("/signinError", getSignInErrorController);
base.get("/goodbye", logoutController);
base.get("/logout", getLogoutController);

base.get("/", homepageController);
base.get("/login", getLoginController);

base.delete("/products/:id", deleteProductController);

base.get("/buy", getBuyController);
base.post("/finalizeBuy", postBuyController);
