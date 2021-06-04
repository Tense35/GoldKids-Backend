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
exports.deleteProducto = exports.putProducto = exports.postProducto = exports.getProducto = exports.getProductos = void 0;
// Propios
var subir_archivos_1 = require("../helpers/subir-archivos");
var producto_1 = __importDefault(require("../models/producto"));
var categoria_1 = __importDefault(require("../models/categoria"));
// Función para errores
var sendError = function (error, res, area) {
    console.log('------------------------------------------');
    console.log("Error productos/controller, " + area);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Avisar al administrador del backend - productos/controller'
    });
};
// Obtener todos los productos de la base de datos
var getProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, estado, descuento, stock, destacado, categoria, destacar, where, _c, data, total, _d, _e, _f, error_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.query, _b = _a.estado, estado = _b === void 0 ? true : _b, descuento = _a.descuento, stock = _a.stock, destacado = _a.destacado, categoria = _a.categoria;
                destacar = (destacado === 'false') ? 0 : 1;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, , 7]);
                where = {};
                if (estado !== 'false') {
                    where.estado = true;
                }
                if (categoria && categoria !== 'false') {
                    where.id_categoria = categoria;
                }
                if (descuento) {
                    where.descuento = descuento;
                }
                if (stock) {
                    where.stock = stock;
                }
                if (destacado) {
                    where.destacar = destacar;
                }
                _e = (_d = Promise).all;
                return [4 /*yield*/, producto_1.default.findAll({ where: where, include: { model: categoria_1.default, attributes: ['nombre'] } })];
            case 2: 
            // Data
            return [4 /*yield*/, (_g.sent()).map(function (resp) {
                    resp.dataValues.precioFinal = (resp.precio - ((resp.precio * resp.descuento) / 100) + ((resp.precio * resp.iva) / 100));
                    return resp;
                })];
            case 3:
                _f = [
                    // Data
                    _g.sent()
                ];
                // Total
                return [4 /*yield*/, producto_1.default.count({ where: where })];
            case 4: return [4 /*yield*/, _e.apply(_d, [_f.concat([
                        // Total
                        _g.sent()
                    ])])];
            case 5:
                _c = _g.sent(), data = _c[0], total = _c[1];
                res.json({
                    ok: true,
                    data: data,
                    total: total
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _g.sent();
                sendError(error_1, res, 'getProductos');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getProductos = getProductos;
// Obtener un producto específico de la base de datos
var getProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, id_producto, data, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? 1 : _a;
                id_producto = req.params.id_producto;
                estado = (estado === 'false') ? 0 : 1;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, producto_1.default.findOne({ where: { id_producto: id_producto, estado: 1 } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, producto_1.default.findByPk(id_producto)];
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
                sendError(error_2, res, 'getProducto');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getProducto = getProducto;
var postProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, archivo, imgUrl, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                info = req.body;
                archivo = req.files;
                info.color = info.color.toLowerCase();
                info.talla = info.talla.toLowerCase();
                info.nombre = info.nombre.toLowerCase();
                info.genero = info.genero.toLowerCase();
                info.descripcion = info.descripcion.toLowerCase();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!archivo) return [3 /*break*/, 3];
                return [4 /*yield*/, subir_archivos_1.subirArchivo(archivo)];
            case 2:
                imgUrl = _a.sent();
                if (imgUrl) {
                    info.imagen = imgUrl;
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, producto_1.default.create(info)];
            case 4:
                data = _a.sent();
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                sendError(error_3, res, 'postProducto');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postProducto = postProducto;
var putProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_producto, info, archivo, producto, productoImg, _a, _b, data, _c, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id_producto = req.params.id_producto;
                info = req.body;
                archivo = req.files;
                if (info.color) {
                    info.color = info.color.toLowerCase();
                }
                if (info.talla) {
                    info.talla = info.talla.toLowerCase();
                }
                if (info.nombre) {
                    info.nombre = info.nombre.toLowerCase();
                }
                if (info.enero) {
                    info.genero = info.genero.toLowerCase();
                }
                if (info.descripcion) {
                    info.descripcion = info.descripcion.toLowerCase();
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                return [4 /*yield*/, producto_1.default.findByPk(id_producto)];
            case 2:
                producto = _d.sent();
                productoImg = producto.dataValues.imagen;
                if (!req.files) return [3 /*break*/, 7];
                _a = info;
                if (!(productoImg)) return [3 /*break*/, 4];
                return [4 /*yield*/, subir_archivos_1.actualizarArchivo(req.files, productoImg)];
            case 3:
                _b = _d.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, subir_archivos_1.subirArchivo(req.files)];
            case 5:
                _b = _d.sent();
                _d.label = 6;
            case 6:
                _a.imagen = _b;
                _d.label = 7;
            case 7:
                if (!(producto)) return [3 /*break*/, 9];
                return [4 /*yield*/, producto.update(info)];
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
                sendError(error_4, res, 'putProducto');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.putProducto = putProducto;
var deleteProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_producto, producto, data, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_producto = req.params.id_producto;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, producto_1.default.findByPk(id_producto)];
            case 2:
                producto = _b.sent();
                if (!(producto)) return [3 /*break*/, 4];
                return [4 /*yield*/, producto.update({ estado: 0 })];
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
                sendError(error_5, res, 'deleteProducto');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productos.js.map