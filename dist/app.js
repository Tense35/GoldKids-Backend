"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones de terceros
var dotenv_1 = __importDefault(require("dotenv"));
// Importaciones propias
var server_1 = __importDefault(require("./models/server"));
// Configurar dot.env
dotenv_1.default.config();
var server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map