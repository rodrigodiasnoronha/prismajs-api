import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const routes = Router();

routes.get('/', UserController.index);

routes.post('/', UserController.store);

export default routes;
