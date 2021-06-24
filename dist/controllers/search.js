"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearch = void 0;
var sequelize_1 = require("sequelize");
// Propios
var v_rutas_1 = require("../helpers/v-rutas");
// Función para errores
var sendError = function (error, res, area) {
    console.log('------------------------------------------');
    console.log("Error search/controller, " + area);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Avisar al administrador del backend - search/controller'
    });
};
var getSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, estado, _c, limite, _d, desde, _e, campo, tabla, termino, Tabla, _f, data, total, _g, _h, _j, _k, _l, error_1;
    var _m, _o, _p, _q, _r, _s, _t, _u;
    return __generator(this, function (_v) {
        switch (_v.label) {
            case 0:
                _a = req.query, _b = _a.estado, estado = _b === void 0 ? true : _b, _c = _a.limite, limite = _c === void 0 ? 10 : _c, _d = _a.desde, desde = _d === void 0 ? 0 : _d;
                _e = req.params, campo = _e.campo, tabla = _e.tabla, termino = _e.termino;
                estado = (estado === 'false') ? false : true;
                _v.label = 1;
            case 1:
                _v.trys.push([1, 11, , 12]);
                Tabla = v_rutas_1.obtenerClase(tabla || 'usuarios');
                // const Tabla = Usuario;
                // Validar el campo
                if (!v_rutas_1.validarCampoSearch(tabla, campo)) {
                    res.status(400).json({
                        ok: false,
                        msg: 'El campo envíado no existe o no es un campo válido.'
                    });
                }
                // Parseo
                limite = Number(limite);
                desde = Number(desde);
                _h = (_g = Promise).all;
                if (!
                // Data
                (estado)) 
                // Data
                return [3 /*break*/, 3];
                return [4 /*yield*/, Tabla.findAll({ where: (_m = { estado: true }, _m[campo] = (_o = {}, _o[sequelize_1.Op.substring] = termino, _o), _m), limit: limite, offset: desde })];
            case 2:
                _j = _v.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, Tabla.findAll({ where: (_p = {}, _p[campo] = (_q = {}, _q[sequelize_1.Op.substring] = termino, _q), _p), limit: limite, offset: desde })];
            case 4:
                _j = _v.sent();
                _v.label = 5;
            case 5:
                _k = [
                    _j
                ];
                if (!
                // Total
                (estado)) 
                // Total
                return [3 /*break*/, 7];
                return [4 /*yield*/, Tabla.count({ where: (_r = { estado: true }, _r[campo] = (_s = {}, _s[sequelize_1.Op.substring] = termino, _s), _r) })];
            case 6:
                _l = _v.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, Tabla.count({ where: (_t = {}, _t[campo] = (_u = {}, _u[sequelize_1.Op.substring] = termino, _u), _t) })];
            case 8:
                _l = _v.sent();
                _v.label = 9;
            case 9: return [4 /*yield*/, _h.apply(_g, [_k.concat([
                        _l
                    ])])];
            case 10:
                _f = _v.sent(), data = _f[0], total = _f[1];
                res.json({
                    ok: true,
                    data: data,
                    total: total
                });
                return [3 /*break*/, 12];
            case 11:
                error_1 = _v.sent();
                sendError(error_1, res, 'getSearch');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getSearch = getSearch;
//# sourceMappingURL=search.js.map