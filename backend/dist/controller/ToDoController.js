"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ToDo_1 = require("../entity/ToDo");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
class ToDoController {
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ToDoRepository = typeorm_1.getRepository(ToDo_1.ToDo);
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const user = yield userRepository.findOne({ id: request.user.id });
                const data = yield ToDoRepository.find({ user: user });
                response.status(200).send({ error: false, data });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ToDoRepository = typeorm_1.getRepository(ToDo_1.ToDo);
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const findOne = yield ToDoRepository.findOne(request.params.id, { relations: ['user'] });
                const user = yield userRepository.findOne({ id: request.user.id });
                if (findOne.user.id !== user.id) {
                    throw new Error('You Are Not Allowed');
                }
                else {
                    yield ToDoRepository.update({ id: request.params.id }, request.body);
                }
                const data = yield ToDoRepository.findOne(request.params.id);
                response.status(200).send({ error: false, data });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    add(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ToDoRepository = typeorm_1.getRepository(ToDo_1.ToDo);
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const todo = new ToDo_1.ToDo();
                todo.name = request.body.name;
                const errors = yield class_validator_1.validate(todo);
                if (errors.length > 0) {
                    const errMessage = Object.values(errors[0].constraints);
                    throw new Error(errMessage[0]);
                }
                const user = yield userRepository.findOne({ id: request.user.id });
                todo.user = user;
                const data = yield ToDoRepository.save(todo);
                delete data.user;
                response.status(200).send({ error: false, data });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ToDoRepository = typeorm_1.getRepository(ToDo_1.ToDo);
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const findOne = yield ToDoRepository.findOne(request.params.id, { relations: ['user'] });
                const user = yield userRepository.findOne({ id: request.user.id });
                if (findOne.user.id !== user.id) {
                    throw new Error('You Are Not Allowed');
                }
                const data = yield ToDoRepository.remove(findOne);
                response.status(200).send({ error: false, data });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
}
exports.ToDoController = ToDoController;
//# sourceMappingURL=ToDoController.js.map