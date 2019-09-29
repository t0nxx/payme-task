"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const router = express_1.Router();
const userController = new UserController_1.UserController();
router.post('/login', userController.login);
router.post('/register', userController.add);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map