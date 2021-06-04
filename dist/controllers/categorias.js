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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.getCategoria = exports.getCategorias = void 0;
// Propios
var categoria_1 = __importDefault(require("../models/categoria"));
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
// Obtener todas las categorias de la base de datos
var getCategorias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, data, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? true : _a;
                estado = (estado === 'false') ? false : true;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, categoria_1.default.findAll({ where: { estado: true } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, categoria_1.default.findAll()];
            case 4:
                _b = _c.sent();
                _c.label = 5;
            case 5:
                data = _b;
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                sendError(error_1, res, 'getCategorias');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCategorias = getCategorias;
// Obtener una categoria específica de la base de datos
var getCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, id_categoria, data, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? 1 : _a;
                id_categoria = req.params.id_categoria;
                estado = (estado === 'false') ? 0 : 1;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, categoria_1.default.findOne({ where: { id_categoria: id_categoria, estado: 1 } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, categoria_1.default.findByPk(id_categoria)];
            case 4:
                _b = _c.sent();
                _c.label = 5;
            case 5:
                data = _b;
                if (!data) {
                    return [2 /*return*/, res.status(404).json({
                            ok: true,
                            data: 'No se encontró la categoría, probablemente fue eliminado.'
                        })];
                }
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                sendError(error_2, res, 'getCategoria');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCategoria = getCategoria;
var postCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_categoria, info, data, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_categoria = _a.id_categoria, info = __rest(_a, ["id_categoria"]);
                info.nombre = info.nombre.toLowerCase();
                if (info.descripcion) {
                    info.descripcion = info.descripcion.toLowerCase();
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, categoria_1.default.create(info)];
            case 2:
                data = _b.sent();
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                sendError(error_3, res, 'postCategoria');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postCategoria = postCategoria;
var putCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_categoria, info, categoria, data, _a, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_categoria = req.params.id_categoria;
                info = req.body;
                if (info.nombre) {
                    info.nombre = info.nombre.toLowerCase();
                }
                if (info.descripcion) {
                    info.descripcion = info.descripcion.toLowerCase();
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, categoria_1.default.findByPk(id_categoria)];
            case 2:
                categoria = _b.sent();
                if (!(categoria)) return [3 /*break*/, 4];
                return [4 /*yield*/, categoria.update(info)];
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
                error_4 = _b.sent();
                sendError(error_4, res, 'putCategoria');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putCategoria = putCategoria;
var deleteCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_categoria, categoria, data, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_categoria = req.params.id_categoria;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, categoria_1.default.findByPk(id_categoria)];
            case 2:
                categoria = _b.sent();
                if (!(categoria)) return [3 /*break*/, 4];
                return [4 /*yield*/, categoria.update({ estado: 0 })];
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
                sendError(error_5, res, 'deleteCategoria');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categorias.js.map