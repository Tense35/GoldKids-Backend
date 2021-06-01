"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
var express_validator_1 = require("express-validator");
var validarCampos = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        var msg = errors['errors'][0].msg;
        return res.status(400).json({
            ok: false,
            msg: msg
        });
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar-campos.js.map