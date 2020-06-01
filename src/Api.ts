import express, { Express } from 'express';
import routes from './routes';
import prisma from './prisma';

class Api {
    public server: Express = express();

    constructor() {
        this.database();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.server.use(routes);
    }

    async database() {
        await prisma.connect();
    }
}

export default Api;
