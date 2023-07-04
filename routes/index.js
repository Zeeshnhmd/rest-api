import express from "express";
import {
	registerController,
	loginController,
	meController,
} from "../controllers";

const routes = express.Router();

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.get("/me", meController.me);

export default routes;
