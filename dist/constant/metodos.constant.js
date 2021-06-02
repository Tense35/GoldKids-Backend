"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wompi = void 0;
var Wompi = /** @class */ (function () {
    function Wompi() {
    }
    Object.defineProperty(Wompi.prototype, "apiMetodosValidos", {
        get: function () {
            return ['CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wompi.prototype, "apiTransaccionEstado", {
        get: function () {
            return ['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'];
        },
        enumerable: false,
        configurable: true
    });
    return Wompi;
}());
exports.Wompi = Wompi;
exports.default = Wompi;
//# sourceMappingURL=metodos.constant.js.map