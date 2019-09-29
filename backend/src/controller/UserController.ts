import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_KEY } from '../config/config';

export class UserController {

    /**
    * @Get All
    */

    async all(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const data = await userRepository.find();
            response.status(200).send({ error: false, data: { data } });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }

    }

    /**
    * @Get One
    */

    async one(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const data = await userRepository.findOne(request.params.id);
            if (!data) { throw new Error('User Not Found'); }
            response.status(200).send({ error: false, data: { data } });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

    /**
   * @Login
   */

    async login(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const data = await userRepository.findOne({ email: request.body.email });
            if (!data) { throw new Error('Invalid Email/Password'); }
            const checkPass = await compare(request.body.password, data.password);
            if (!checkPass) { throw new Error('Invalid Email/Password'); }
            delete data.password;
            const token = await sign({ id: data.id }, JWT_KEY, { expiresIn: '12h' });
            response.status(200).send({ error: false, data: { ...data, token } });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

    /**
    * @Add One
    */

    async add(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const { name, email, password } = request.body;
            const user = new User();
            user.email = email; user.name = name; user.password = password;
            const errors = await validate(user);
            if (errors.length > 0) {
                const errMessage = Object.values(errors[0].constraints);
                throw new Error(errMessage[0]);
            }
            const checkExist = await userRepository.findOne({ email: email });
            if (checkExist) { throw new Error('User Already Register'); }
            const data = await userRepository.save(user);
            delete data.password;
            const token = await sign({ id: data.id }, JWT_KEY, { expiresIn: '12h' });
            response.status(200).send({ error: false, data: { ...data, token } });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

    /**
    * @Delete One
    */

    async remove(request: Request, response: Response, next: NextFunction) {

        const userRepository = getRepository(User);
        try {
            const userToRemove = await userRepository.findOne(request.params.id);
            const data = await userRepository.remove(userToRemove);
            response.status(200).send({ error: false, data: { data } });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

}
