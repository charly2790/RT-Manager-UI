import React from 'react'
import { ChartFactory } from './ChartFactory'

export const Chart = ({ type, data, options }) => {
    const ChartComponent = ChartFactory.getChart(type);
    return (<ChartComponent data={data} options={options} />)
}
