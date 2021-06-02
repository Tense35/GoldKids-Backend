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
exports.deleteVenta = exports.putVenta = exports.postVenta = exports.getVenta = exports.getVentas = void 0;
// Propios
var dbv_cliente_1 = require("../helpers/dbv-cliente");
var venta_1 = __importDefault(require("../models/venta"));
var dbv_venta_1 = require("../helpers/dbv-venta");
// Función para errores
var sendError = function (error, res, area) {
    console.log('------------------------------------------');
    console.log("Error ventas/controller, " + area);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Avisar al administrador del backend - ventas/controller'
    });
};
// Listados
var metodos = ['CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'];
var transacciones = ['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'];
// Obtener todas las ventas de la base de datos
var getVentas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, estado, id_producto, id_cliente, metodo, transaccion, total, where, data, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, _b = _a.estado, estado = _b === void 0 ? true : _b, id_producto = _a.id_producto, id_cliente = _a.id_cliente, metodo = _a.metodo, transaccion = _a.transaccion, total = _a.total;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                where = {};
                if (estado !== 'false') {
                    where.estado = true;
                }
                if (id_cliente) {
                    if (dbv_cliente_1.clienteNoExiste(Number(id_cliente))) {
                        where.id_cliente = Number(id_cliente);
                    }
                }
                if (metodo) {
                    if (metodos.includes(String(metodo))) {
                        where.metodo = String(metodo);
                    }
                }
                if (transaccion) {
                    if (transacciones.includes(String(transaccion))) {
                        where.transaccion = String(transaccion);
                    }
                }
                if (total) {
                    where.total = Number(total);
                }
                return [4 /*yield*/, venta_1.default.findAll({ where: where })];
            case 2:
                data = _c.sent();
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                sendError(error_1, res, 'getVentas');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getVentas = getVentas;
// Obtener una venta específica de la base de datos
var getVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, id_venta, data, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? 1 : _a;
                id_venta = req.params.id_venta;
                estado = (estado === 'false') ? 0 : 1;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, venta_1.default.findOne({ where: { id_venta: id_venta, estado: 1 } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, venta_1.default.findByPk(id_venta)];
            case 4:
                _b = _c.sent();
                _c.label = 5;
            case 5:
                data = _b;
                if (!data) {
                    return [2 /*return*/, res.status(404).json({
                            ok: true,
                            data: 'No se encontró la venta, probablemente fue eliminada.'
                        })];
                }
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                sendError(error_2, res, 'getVenta');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getVenta = getVenta;
var postVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                info = req.body;
                info.direccion = info.direccion.toLowerCase();
                info.metodo = info.metodo.toUpperCase();
                info.transaccion = info.transaccion.toUpperCase();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, venta_1.default.create(info)];
            case 2:
                data = _a.sent();
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                sendError(error_3, res, 'postVenta');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postVenta = postVenta;
var putVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_venta, info, error, venta, data, _a, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_venta = req.params.id_venta;
                info = req.body;
                error = null;
                if (!info.id_cliente) return [3 /*break*/, 2];
                return [4 /*yield*/, dbv_cliente_1.clienteNoExiste(info.id_cliente).catch(function (err) { return error = err; })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                if (info.direccion) {
                    info.direccion = info.direccion.toLowerCase();
                }
                if (!info.metodo) return [3 /*break*/, 4];
                info.metodo = info.metodo.toUpperCase();
                return [4 /*yield*/, dbv_venta_1.validarMetodo(info.metodo).catch(function (err) { return error = err; })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!info.transaccion) return [3 /*break*/, 6];
                info.transaccion = info.metodo.toUpperCase();
                return [4 /*yield*/, dbv_venta_1.validarTransaccion(info.transaccion).catch(function (err) { return error = err; })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                if (error) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: error
                        })];
                }
                _b.label = 7;
            case 7:
                _b.trys.push([7, 12, , 13]);
                return [4 /*yield*/, venta_1.default.findByPk(id_venta)];
            case 8:
                venta = _b.sent();
                if (!(venta)) return [3 /*break*/, 10];
                return [4 /*yield*/, venta.update(info)];
            case 9:
                _a = _b.sent();
                return [3 /*break*/, 11];
            case 10:
                _a = null;
                _b.label = 11;
            case 11:
                data = _a;
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 13];
            case 12:
                error_4 = _b.sent();
                sendError(error_4, res, 'putVenta');
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.putVenta = putVenta;
var deleteVenta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_venta, venta, data, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_venta = req.params.id_venta;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, venta_1.default.findByPk(id_venta)];
            case 2:
                venta = _b.sent();
                if (!(venta)) return [3 /*break*/, 4];
                return [4 /*yield*/, venta.update({ estado: 0 })];
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
                sendError(error_5, res, 'deleteVenta');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteVenta = deleteVenta;
//# sourceMappingURL=ventas.js.map