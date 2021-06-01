"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generarJWT = function (email) {
    if (email === void 0) { email = ''; }
    return new Promise(function (resolve, reject) {
        var payload = { email: email };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || '', { expiresIn: '24h' }, function (err, token) {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
//# sourceMappingURL=jwt-generator.js.map