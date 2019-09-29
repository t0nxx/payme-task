"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRouter_1 = require("./UserRouter");
const ToDoRouter_1 = require("./ToDoRouter");
const routes = express_1.Router();
routes.use('/api/users', UserRouter_1.default);
routes.use('/api/todos', ToDoRouter_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map