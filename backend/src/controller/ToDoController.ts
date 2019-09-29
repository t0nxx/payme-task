import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { ToDo } from '../entity/ToDo';
import { User } from '../entity/User';
import { validate } from 'class-validator';

export class ToDoController {

    /**
    * @Get All
    */

    async all(request, response: Response, next: NextFunction) {

        const ToDoRepository = getRepository(ToDo);
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOne({ id: request.user.id })
            const data = await ToDoRepository.find({ user: user });
            response.status(200).send({ error: false, data });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }

    }

    /**
    * @Get One
    */

    async update(request, response: Response, next: NextFunction) {

        const ToDoRepository = getRepository(ToDo);
        const userRepository = getRepository(User);
        try {
            const findOne = await ToDoRepository.findOne(request.params.id, { relations: ['user'] });
            const user = await userRepository.findOne({ id: request.user.id })
            if (findOne.user.id !== user.id) {
                throw new Error('You Are Not Allowed');
            } else {
                await ToDoRepository.update({ id: request.params.id }, request.body);
            }
            const data = await ToDoRepository.findOne(request.params.id);
            response.status(200).send({ error: false, data });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

    /**
    * @Add One
    */

    async add(request, response: Response, next: NextFunction) {

        const ToDoRepository = getRepository(ToDo);
        const userRepository = getRepository(User);
        try {
            const todo = new ToDo();
            todo.name = request.body.name;
            const errors = await validate(todo);
            if (errors.length > 0) {
                const errMessage = Object.values(errors[0].constraints);
                throw new Error(errMessage[0]);
            }
            const user = await userRepository.findOne({ id: request.user.id })
            todo.user = user;
            const data = await ToDoRepository.save(todo);
            delete data.user;
            response.status(200).send({ error: false, data });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

    /**
    * @Delete One
    */

    async remove(request, response: Response, next: NextFunction) {

        const ToDoRepository = getRepository(ToDo);
        const userRepository = getRepository(User);
        try {
            const findOne = await ToDoRepository.findOne(request.params.id, { relations: ['user'] });
            const user = await userRepository.findOne({ id: request.user.id })
            if (findOne.user.id !== user.id) {
                throw new Error('You Are Not Allowed');
            }
            const data = await ToDoRepository.remove(findOne);
            response.status(200).send({ error: false, data });
        } catch (error) {
            response.status(400).send({ error: true, data: error.message });
        }
    }

}
