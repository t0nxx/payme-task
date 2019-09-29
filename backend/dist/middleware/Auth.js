"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
exports.default = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: true, data: 'Invalid Token' });
    }
    try {
        const decode = jsonwebtoken_1.verify(token, config_1.JWT_KEY);
        if (decode) {
            req.user = decode;
        }
        next();
    }
    catch (error) {
        return res.status(401).send({ error: true, data: 'Invalid Token' });
    }
};
//# sourceMappingURL=Auth.js.map