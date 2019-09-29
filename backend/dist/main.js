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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const index_1 = require("./routes/index");
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(index_1.default);
    app.use(express.static((path.join(__dirname, '..', 'frontend'))));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
    });
    app.listen(process.env.PORT);
    console.log('Express server has started on port 3000. Open http://localhost:3000/ to see results');
})).catch(error => console.log(error));
//# sourceMappingURL=main.js.map