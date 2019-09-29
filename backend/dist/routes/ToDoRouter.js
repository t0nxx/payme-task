"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ToDoController_1 = require("../controller/ToDoController");
const Auth_1 = require("../middleware/Auth");
const router = express_1.Router();
const toDoController = new ToDoController_1.ToDoController();
router.get('/', Auth_1.default, toDoController.all);
router.post('/', Auth_1.default, toDoController.add);
router.put('/:id', Auth_1.default, toDoController.update);
router.delete('/:id', Auth_1.default, toDoController.remove);
exports.default = router;
//# sourceMappingURL=ToDoRouter.js.map