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
exports.validarCampoSearch = exports.obtenerClase = exports.rutaNoExiste = void 0;
var rutas_constant_1 = require("../constant/rutas.constant");
var producto_1 = __importDefault(require("../models/producto"));
var usuario_1 = __importDefault(require("../models/usuario"));
var cliente_1 = __importDefault(require("../models/cliente"));
var categoria_1 = __importDefault(require("../models/categoria"));
var rutas = new rutas_constant_1.Rutas();
var rutaNoExiste = function (tabla) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!rutas.rutasValidas.includes(tabla)) {
            throw new Error("La ruta " + tabla + " no existe o no es permitida. Rutas permitidas: " + rutas.rutasValidas);
        }
        return [2 /*return*/];
    });
}); };
exports.rutaNoExiste = rutaNoExiste;
// @ts-ignore
var obtenerClase = function (tabla) {
    console.log('Función clase');
    switch (tabla.toLowerCase()) {
        case 'usuarios':
            return usuario_1.default;
            break;
        case 'categorias':
            return categoria_1.default;
            break;
        case 'clientes':
            return cliente_1.default;
            break;
        case 'productos':
            return producto_1.default;
            break;
        default:
            return usuario_1.default;
            break;
    }
};
exports.obtenerClase = obtenerClase;
var validarCampoSearch = function (tabla, campo) {
    switch (tabla.toLowerCase()) {
        case 'usuarios':
            if (rutas.camposUsuario.includes(campo.toLowerCase())) {
                return true;
            }
            break;
        // case 'categorias':
        //     return Categoria;
        // break;
        // case 'clientes':
        //     return Cliente;
        // break;
        case 'productos':
            if (rutas.camposProducto.includes(campo.toLowerCase())) {
                return true;
            }
            break;
        default:
            return false;
            break;
    }
};
exports.validarCampoSearch = validarCampoSearch;
//# sourceMappingURL=v-rutas.js.map