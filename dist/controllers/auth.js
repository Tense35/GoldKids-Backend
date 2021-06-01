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
exports.getRenew = exports.postLogin = void 0;
// Propios
var jwt_generator_1 = __importDefault(require("../helpers/jwt-generator"));
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
var postLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, usuario, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, usuario_1.default.findByPk(email)];
            case 2:
                usuario = _b.sent();
                // @ts-ignore
                if (password !== usuario.password) {
                    return [2 /*return*/, res.status(401).json({
                            ok: false,
                            msg: 'Password incorrecto'
                        })];
                }
                return [4 /*yield*/, jwt_generator_1.default(email)];
            case 3:
                token = _b.sent();
                res.json({
                    ok: true,
                    token: token
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                sendError(error_1, res, 'postLogin');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postLogin = postLogin;
var getRenew = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.usuario;
                email = data.email;
                delete data.dataValues.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, jwt_generator_1.default(email)];
            case 2:
                token = _a.sent();
                res.json({
                    ok: true,
                    token: token,
                    data: data
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                sendError(error_2, res, 'postLogin');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRenew = getRenew;
//# sourceMappingURL=auth.js.map