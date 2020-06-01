import { Request, Response } from 'express';
import prisma from '../../prisma';

class UserController {
    async index(request: Request, response: Response) {
        const users = await prisma.user.findMany();

        return response.json({ data: users });
    }

    async store(request: Request, response: Response) {
        const { email, name } = request.body as { email: string; name: string };

        const isEmailAlreadyRegistered = await prisma.user.findOne({
            where: { email },
        });

        if (isEmailAlreadyRegistered) {
            return response.status(400).json({
                code: 'error/email-already-registered',
                message: 'Email already registered',
            });
        }

        const user = await prisma.user.create({
            data: { email, name },
        });

        return response.json(user);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user = await prisma.user.findOne({ where: { id: Number(id) } });

        if (!user) {
            return response.status(404).json({
                code: 'error/not-found',
                message: 'User not found',
            });
        }

        return response.json(user);
    }
}

export default new UserController();
