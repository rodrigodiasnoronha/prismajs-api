import { Router } from 'express';
import userRoutes from './user.routes';

const routes = Router();

routes.get('/', (request, response) => {
    response.json({ hello: 'world' });
});

routes.use('/users', userRoutes);

export default routes;
