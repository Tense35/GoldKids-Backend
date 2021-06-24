"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rutas = void 0;
var Rutas = /** @class */ (function () {
    function Rutas() {
    }
    Object.defineProperty(Rutas.prototype, "rutasValidas", {
        get: function () {
            return ['usuarios', 'categorias', 'productos', 'clientes', 'ventas'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rutas.prototype, "camposUsuario", {
        get: function () {
            return ['email', 'nombre'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rutas.prototype, "camposProducto", {
        get: function () {
            return ['id_producto', 'id_categoria', 'color', 'talla', 'nombre', 'genero', 'precio', 'descripcion', 'iva', 'destacar', 'descuento', 'stock', 'estado'];
        },
        enumerable: false,
        configurable: true
    });
    return Rutas;
}());
exports.Rutas = Rutas;
//# sourceMappingURL=rutas.constant.js.map