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
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
class UserController {
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const data = yield userRepository.find();
                response.status(200).send({ error: false, data: { data } });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const data = yield userRepository.findOne(request.params.id);
                if (!data) {
                    throw new Error('User Not Found');
                }
                response.status(200).send({ error: false, data: { data } });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const data = yield userRepository.findOne({ email: request.body.email });
                if (!data) {
                    throw new Error('Invalid Email/Password');
                }
                const checkPass = yield bcryptjs_1.compare(request.body.password, data.password);
                if (!checkPass) {
                    throw new Error('Invalid Email/Password');
                }
                delete data.password;
                const token = yield jsonwebtoken_1.sign({ id: data.id }, config_1.JWT_KEY, { expiresIn: '12h' });
                response.status(200).send({ error: false, data: Object.assign({}, data, { token }) });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    add(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const { name, email, password } = request.body;
                const user = new User_1.User();
                user.email = email;
                user.name = name;
                user.password = password;
                const errors = yield class_validator_1.validate(user);
                if (errors.length > 0) {
                    const errMessage = Object.values(errors[0].constraints);
                    throw new Error(errMessage[0]);
                }
                const checkExist = yield userRepository.findOne({ email: email });
                if (checkExist) {
                    throw new Error('User Already Register');
                }
                const data = yield userRepository.save(user);
                delete data.password;
                const token = yield jsonwebtoken_1.sign({ id: data.id }, config_1.JWT_KEY, { expiresIn: '12h' });
                response.status(200).send({ error: false, data: Object.assign({}, data, { token }) });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.User);
            try {
                const userToRemove = yield userRepository.findOne(request.params.id);
                const data = yield userRepository.remove(userToRemove);
                response.status(200).send({ error: false, data: { data } });
            }
            catch (error) {
                response.status(400).send({ error: true, data: error.message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map