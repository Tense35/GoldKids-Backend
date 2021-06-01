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
// Terceros
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
// Propios
var connection_1 = __importDefault(require("../db/connection"));
// Rutas
var auth_1 = __importDefault(require("../routes/auth"));
var categorias_1 = __importDefault(require("../routes/categorias"));
var clientes_1 = __importDefault(require("../routes/clientes"));
var productos_1 = __importDefault(require("../routes/productos"));
var search_1 = __importDefault(require("../routes/search"));
var usuarios_1 = __importDefault(require("../routes/usuarios"));
var Server = /** @class */ (function () {
    function Server() {
        // Definición de endpoints
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            clientes: '/api/clientes',
            productos: '/api/productos',
            search: '/api/search',
            usuarios: '/api/usuarios',
            ventas: '/api/ventas'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8081';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // Establecer conexión con la base de datos
    Server.prototype.dbConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.authenticate()];
                    case 1:
                        _a.sent();
                        console.log('Database online');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.middlewares = function () {
        // Cors
        this.app.use(cors_1.default());
        // Lectura del body - Permite leer el body de las peticiones rest
        this.app.use(express_1.default.json());
        // Carpeta pública - Carpeta inicial en el navegador
        this.app.use(express_1.default.static('public'));
        // Permitir subir archivo mediante el API REST
        this.app.use(express_fileupload_1.default({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    };
    // Definición de rutas
    Server.prototype.routes = function () {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.categorias, categorias_1.default);
        this.app.use(this.paths.clientes, clientes_1.default);
        this.app.use(this.paths.productos, productos_1.default);
        this.app.use(this.paths.search, search_1.default);
        this.app.use(this.paths.usuarios, usuarios_1.default);
    };
    // Levantar el servidor
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Servidor corriendo en puerto ' + _this.port);
        });
    };
    return Server;
}());
// Exportar la clase
exports.default = Server;
//# sourceMappingURL=server.js.map