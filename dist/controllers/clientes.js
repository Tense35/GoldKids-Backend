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
exports.deleteCliente = exports.putCliente = exports.postCliente = exports.getCliente = exports.getClientes = void 0;
// Propios
var cliente_1 = __importDefault(require("../models/cliente"));
// Función para errores
var sendError = function (error, res, area) {
    console.log('------------------------------------------');
    console.log("Error clientes/controller, " + area);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Avisar al administrador del backend - clientes/controller'
    });
};
// Obtener todos los clientes de la base de datos
var getClientes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, _b, data, total, _c, _d, _e, _f, _g, error_1;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? true : _a;
                estado = (estado === 'false') ? false : true;
                _h.label = 1;
            case 1:
                _h.trys.push([1, 11, , 12]);
                _d = (_c = Promise).all;
                if (!
                // Data
                (estado)) 
                // Data
                return [3 /*break*/, 3];
                return [4 /*yield*/, cliente_1.default.findAll({ where: { estado: true } })];
            case 2:
                _e = _h.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, cliente_1.default.findAll()];
            case 4:
                _e = _h.sent();
                _h.label = 5;
            case 5:
                _f = [
                    _e
                ];
                if (!
                // Total
                (estado)) 
                // Total
                return [3 /*break*/, 7];
                return [4 /*yield*/, cliente_1.default.count({ where: { estado: true } })];
            case 6:
                _g = _h.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, cliente_1.default.count()];
            case 8:
                _g = _h.sent();
                _h.label = 9;
            case 9: return [4 /*yield*/, _d.apply(_c, [_f.concat([
                        _g
                    ])])];
            case 10:
                _b = _h.sent(), data = _b[0], total = _b[1];
                res.json({
                    ok: true,
                    data: data,
                    total: total
                });
                return [3 /*break*/, 12];
            case 11:
                error_1 = _h.sent();
                sendError(error_1, res, 'getClientes');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getClientes = getClientes;
// Obtener un cliente específico de la base de datos
var getCliente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, estado, id_cliente, data, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query.estado, estado = _a === void 0 ? 1 : _a;
                id_cliente = req.params.id_cliente;
                id_cliente = id_cliente.toLowerCase();
                estado = (estado === 'false') ? 0 : 1;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!(estado)) return [3 /*break*/, 3];
                return [4 /*yield*/, cliente_1.default.findOne({ where: { id_cliente: id_cliente, estado: 1 } })];
            case 2:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, cliente_1.default.findByPk(id_cliente)];
            case 4:
                _b = _c.sent();
                _c.label = 5;
            case 5:
                data = _b;
                if (!data) {
                    return [2 /*return*/, res.status(404).json({
                            ok: true,
                            data: 'No se encontró el cliente, probablemente fue eliminado.'
                        })];
                }
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                sendError(error_2, res, 'getCliente');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCliente = getCliente;
var postCliente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, cliente, data_1, _a, data, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                info = req.body;
                info.nombre = info.nombre.toLowerCase();
                info.tipo_id = info.tipo_id.toLowerCase();
                info.email = info.email.toLowerCase();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, cliente_1.default.findByPk(info.id_cliente)];
            case 2:
                cliente = _b.sent();
                if (!cliente) return [3 /*break*/, 6];
                info.estado = true;
                if (!(cliente)) return [3 /*break*/, 4];
                return [4 /*yield*/, cliente.update(info)];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = null;
                _b.label = 5;
            case 5:
                data_1 = _a;
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: 'Se ha actualizado la información del cliente',
                        data: data_1
                    })];
            case 6: return [4 /*yield*/, cliente_1.default.create(info)];
            case 7:
                data = _b.sent();
                res.json({
                    ok: true,
                    data: data
                });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _b.sent();
                sendError(error_3, res, 'postCliente');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.postCliente = postCliente;
var putCliente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_cliente, info, cliente, data, _a, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_cliente = req.params.id_cliente;
                info = req.body;
                if (info.email) {
                    info.email = info.email.toLowerCase();
                }
                if (info.tipo_id) {
                    info.tipo_id = info.tipo_id.toLowerCase();
                }
                if (info.nombre) {
                    info.nombre = info.nombre.toLowerCase();
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, cliente_1.default.findByPk(id_cliente)];
            case 2:
                cliente = _b.sent();
                if (!(cliente)) return [3 /*break*/, 4];
                return [4 /*yield*/, cliente.update(info)];
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
                sendError(error_4, res, 'putCliente');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putCliente = putCliente;
var deleteCliente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_cliente, cliente, data, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_cliente = req.params.id_cliente;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, cliente_1.default.findByPk(id_cliente)];
            case 2:
                cliente = _b.sent();
                if (!(cliente)) return [3 /*break*/, 4];
                return [4 /*yield*/, cliente.update({ estado: 0 })];
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
                sendError(error_5, res, 'deleteCliente');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=clientes.js.map