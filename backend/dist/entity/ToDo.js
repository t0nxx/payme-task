"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
let ToDo = class ToDo {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ToDo.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ToDo.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], ToDo.prototype, "isDone", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.todos),
    __metadata("design:type", User_1.User)
], ToDo.prototype, "user", void 0);
ToDo = __decorate([
    typeorm_1.Entity()
], ToDo);
exports.ToDo = ToDo;
//# sourceMappingURL=ToDo.js.map