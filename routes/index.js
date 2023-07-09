import express from "express";
import {
	registerController,
	loginController,
	meController,
} from "../controllers";
import { auth } from "../middlewares";

const routes = express.Router();

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.get("/me", auth, meController.me);

export default routes;
