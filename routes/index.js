import express from 'express';
import { registerController } from '../controllers';

const routes = express.Router();

routes.post('/register', registerController.register);

export default routes;
