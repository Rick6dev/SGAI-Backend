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
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineTiempoEntrega = determineTiempoEntrega;
function determineTiempoEntrega(fecha_culminacion, fecha_avalado) {
    return __awaiter(this, void 0, void 0, function* () {
        // Definir las fechas
        const fecha1 = new Date(fecha_culminacion);
        const fecha2 = fecha_avalado;
        // Restar las fechas y obtener la diferencia en milisegundos
        const diferenciaEnMilisegundos = fecha2 - fecha1;
        console.log(fecha1, fecha_avalado);
        // Convertir la diferencia a días
        const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
        console.log(diferenciaEnMilisegundos);
        // Variable para almacenar el estado
        let entrega = null;
        if (diferenciaEnMilisegundos < 0) {
            entrega = "Pro"; // Si la diferencia es negativa
        }
        else if (diferenciaEnDias === 0) {
            entrega = "Bien hecho"; // Si la diferencia es cero
        }
        else {
            entrega = "Atraso"; // Si la diferencia es positiva
        }
        console.log(entrega);
        console.log(`La diferencia es de ${diferenciaEnDias} días. Estado: `);
        return entrega;
    });
}
