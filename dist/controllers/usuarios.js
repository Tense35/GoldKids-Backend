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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
// Propios
var jwt_generator_1 = __importDefault(require("../helpers/jwt-generator"));
var subir_archivos_1 = require("../helpers/subir-archivos");
var usuario_1 = __importDefault(require("../models/usuario"));
// Función para errores
var sendError = function (error, res, area) {
    console.log('------------------------------------------');
    console.log("Error usuarios/controller, " + area);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Avisar al administrador del backend - usuarios/controller'
    });
};
// Obtener todos los usuarios de la base de datos
var getUsuarios = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, estado, _c, limite, _d, desde, _e, data, total, _f, _g, _h, _j, error_1;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = req.query, _b = _a.estado, estado = _b === void 0 ? true : _b, _c = _a.limite, limite = _c === void 0 ? 40 : _c, _d = _a.desde, desde = _d === void 0 ? 0 : _d;
                estado = (estado === 'false') ? false : true;
                _k.label = 1;
            case 1:
                _k.trys.push([1, 8, , 9]);
                // Parseo
                limite = Number(limite);
                desde = Number(desde);
                _g = (_f = Promise).all;
                if (!
                // Data
                (estado)) 
                // Data
                return [3 /*break*/, 3];
                return [4 /*yield*/, usuario_1.default.findAll({ where: { estado: true }, order: [['email', 'ASC']], limit: limite, offset: desde })];
            case 2:
                _h = _k.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, usuario_1.default.findAll({ limit: limite, offset: desde })];
            case 4:
                _h = _k.sent();
                _k.label = 5;
            case 5:
                _j = [
                    _h
                ];
                // Total
                return [4 /*yield*/, usuario_1.default.count()];
            case 6: return [4 /*yield*/, _g.apply(_f, [_j.concat([
                        // Total
                        _k.sent()
                    ])])];
            case 7:
                _e = _k.sent(), data = _e[0], total = _e[1];
                res.json({
                    ok: true,
                    data: data,
                    total: total
                });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _k.sent();
                sendError(error_1, res, 'getUsuarios');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getUsuarios = getUsuarios;
// Obtener un usuario específico de la base de datos
var getUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, email, data, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? 1 : _a;
                email = req.params.email;
                email = email.toLowerCase();
                estado = (estado === 'false') ? 0 : 1;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, usuario_1.default.findOne({ where: { email: email, estado: 1 } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, usuario_1.default.findByPk(email)];
            case 4:
                _b = _c.sent();
                _c.label = 5;
            case 5:
                data = _b;
                if (!data) {
                    return [2 /*return*/, res.status(404).json({
                            ok: true,
                            data: 'No se encontró el usuario, probablemente fue eliminado.'
                        })];
                }
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                sendError(error_2, res, 'getUsuario');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getUsuario = getUsuario;
var postUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, archivo, imgUrl, data, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                info = req.body;
                archivo = req.files;
                info.email = info.email.toLowerCase();
                info.nombre = info.nombre.toLowerCase();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!archivo) return [3 /*break*/, 3];
                return [4 /*yield*/, subir_archivos_1.subirArchivo(archivo)];
            case 2:
                imgUrl = _a.sent();
                if (imgUrl) {
                    info.imagen = imgUrl;
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, usuario_1.default.create(info)];
            case 4:
                data = _a.sent();
                return [4 /*yield*/, jwt_generator_1.default(data.email)];
            case 5:
                token = _a.sent();
                res.json({
                    ok: true,
                    data: data,
                    token: token
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                sendError(error_3, res, 'postUsuario');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postUsuario = postUsuario;
var putUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, info, archivo, usuario, usuarioImg, _a, _b, data, _c, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                email = req.params.email;
                info = req.body;
                archivo = req.files;
                if (info.nombre) {
                    info.nombre = info.nombre.toLowerCase();
                }
                if (info.password) {
                    if (info.password.length < 5) {
                        return [2 /*return*/, res.status(400).json({
                                ok: false,
                                msg: 'El password debe de tener 5 o más caracteres'
                            })];
                    }
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                return [4 /*yield*/, usuario_1.default.findByPk(email)];
            case 2:
                usuario = _d.sent();
                usuarioImg = usuario.dataValues.imagen;
                if (!req.files) return [3 /*break*/, 7];
                //@ts-ignore
                _a = info;
                if (!(usuarioImg)) return [3 /*break*/, 4];
                return [4 /*yield*/, subir_archivos_1.actualizarArchivo(req.files, usuarioImg)];
            case 3:
                _b = _d.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, subir_archivos_1.subirArchivo(req.files)];
            case 5:
                _b = _d.sent();
                _d.label = 6;
            case 6:
                //@ts-ignore
                _a.imagen = _b;
                _d.label = 7;
            case 7:
                if (!(usuario)) return [3 /*break*/, 9];
                return [4 /*yield*/, usuario.update(info)];
            case 8:
                _c = _d.sent();
                return [3 /*break*/, 10];
            case 9:
                _c = null;
                _d.label = 10;
            case 10:
                data = _c;
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 12];
            case 11:
                error_4 = _d.sent();
                sendError(error_4, res, 'putUsuario');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.putUsuario = putUsuario;
var deleteUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, usuario, data, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.params.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, usuario_1.default.findByPk(email)];
            case 2:
                usuario = _b.sent();
                if (!(usuario)) return [3 /*break*/, 4];
                return [4 /*yield*/, usuario.update({ estado: 0 })];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = null;
                _b.label = 5;
            case 5:
                data = _a;
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_5 = _b.sent();
                sendError(error_5, res, 'deleteUsuario');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map