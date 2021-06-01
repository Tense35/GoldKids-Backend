"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var usuarios_1 = require("../controllers/usuarios");
// Helpers y middlewares
var dbv_usuario_1 = require("../helpers/dbv-usuario");
var validar_campos_1 = require("../middlewares/validar-campos");
// Rutas
// Obtener todos los usuarios | !query: estado=false
router.get('/', usuarios_1.getUsuarios);
// Obtener un usuario | !query: estado=false
router.get('/:email', [
    express_validator_1.check('email', 'El email proporcionado no es un email válido').isEmail(),
    express_validator_1.check('email').custom(dbv_usuario_1.emailNoExiste),
    validar_campos_1.validarCampos
], usuarios_1.getUsuario);
// Crear un usuario
router.post('/', [
    express_validator_1.check('email', 'El email es obligatorio').notEmpty(),
    validar_campos_1.validarCampos,
    express_validator_1.check('email', 'El email proporcionado no es un email válido').isEmail(),
    validar_campos_1.validarCampos,
    express_validator_1.check('email').custom(dbv_usuario_1.emailExiste),
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('password', 'La contraseña es obliatoria y debe contener mínimo 5 caracteres').isLength({ min: 5, max: undefined }),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:email', [
    express_validator_1.check('email', 'El email proporcionado no es un email válido').isEmail(),
    validar_campos_1.validarCampos,
    express_validator_1.check('email').custom(dbv_usuario_1.emailNoExiste),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:email', [
    express_validator_1.check('email', 'El email proporcionado no es un email válido').isEmail(),
    validar_campos_1.validarCampos,
    express_validator_1.check('email').custom(dbv_usuario_1.emailNoExiste),
    validar_campos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map