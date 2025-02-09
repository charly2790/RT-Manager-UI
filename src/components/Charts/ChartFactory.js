import { CHART_TYPES, Bar, Pie } from "./types";

export class ChartFactory {

    static getChart(type){

        switch(type){
            case CHART_TYPES.BAR:
                return Bar
            case CHART_TYPES.PIE:
                return Pie
            default:
                throw new Error('Tipo de gráfico no soportado');
        }

    }
}