"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var auth_1 = require("../controllers/auth");
// Helpers y middlewares
var dbv_usuario_1 = require("../helpers/dbv-usuario");
var validar_campos_1 = require("../middlewares/validar-campos");
var validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
// Rutas
// Logearse
router.post('/', [
    express_validator_1.check('email', 'El email es obligatorio y debe ser un email válido').isEmail(),
    validar_campos_1.validarCampos,
    express_validator_1.check('email').custom(dbv_usuario_1.emailNoExiste),
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], auth_1.postLogin);
// Renovar un Token
router.get('/renew', [
    validar_jwt_1.default,
    validar_campos_1.validarCampos
], auth_1.getRenew);
exports.default = router;
//# sourceMappingURL=auth.js.map