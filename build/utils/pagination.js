"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginar = paginar;
function paginar(count, cantidad) {
    const isInteger = Number.isInteger(count / cantidad);
    if (isInteger) {
        return count;
    }
    else {
        const result = Math.floor(count / cantidad) + 1;
        return result;
    }
}
