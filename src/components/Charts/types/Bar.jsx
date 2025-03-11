import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import _ from 'lodash';
import { xAxis } from '../../../performances/types';
import { blueberryTwilightPalette, blueberryTwilightPaletteDark, blueberryTwilightPaletteLight, cheerfulFiestaPalette, mangoFusionPalette, mangoFusionPaletteDark, mangoFusionPaletteLight } from '@mui/x-charts';

export const Bar = ({ data, options }) => {

    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    const { series } = data;
    const { xAxis } = options;

    return (
        <Card variant='outlined' sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Kms Semana
                </Typography>
                {
                    series.length === 0
                        ? <Stack
                            direction={"column"}
                            sx={{
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: (theme) => theme.palette.text.secondary
                            }}
                        >
                            <Typography variant='h3' component="p">
                                No hay datos disponibles
                            </Typography>
                            <Typography variant='body2'>
                                Por favor, verificá los filtros.
                            </Typography>
                        </Stack>
                        : <Stack sx={{ justifyContent: 'space-between' }}>
                            <Stack
                                direction={"row"}
                                sx={{
                                    alignContent: { xs: 'center', sm: 'flex-start' },
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Typography variant="h4" component="p">
                                    30.5 KMs totales
                                </Typography>
                                <Chip size="small" color="primary" variant="outlined" label="+5%" />
                            </Stack>
                            <BarChart
                                borderRadius={4}
                                colors={blueberryTwilightPaletteLight}
                                xAxis={[{
                                    scaleType: 'band',
                                    categoryGapRatio: 0.1,                                    
                                    barGapRatio: -1,
                                    data: xAxis
                                }]
                                }
                                series={series.map(serie => ({
                                    ...serie,                                                  
                                }))}
                                height={450}
                                margin={{ left: 50, right: 0, top: 50, bottom: 20 }}
                                grid={{ horizontal: true }}
                                slotProps={{
                                    //loadingOverlay: { message: 'Data should be available soon.' },
                                    legend: { hidden: false, },
                                    barLabel: {                                                                                                                                                                                                                                                             
                                        sx: {                                            
                                            fontSize: '1em',
                                            fontWeight: 'bold',                                            
                                            fill: '#FFFFFF',
                                            border: '1px dotted black',
                                            margin: '0 0 10% 0'                                            
                                        }
                                    },
                                    bar:{
                                        radius: 12,
                                    }
                                }}                                
                                barLabel={(item, context) => {                                    
                                    if(item.seriesId !== 'total') return null;
                                    
                                    // Solo mostramos los valores de la serie 'total'
                                    const totalSerie = series.find(s => s.id === "total");
                                    if (!totalSerie) return null;                                                                    
                            
                                    const index = item.dataIndex; // Obtener índice de la barra
                                    return `${totalSerie.data[index]} kms`; // Mostrar el total correspondiente a esa posición
                                }}

                            />

                        </Stack>

                }
            </CardContent>
        </Card>
    )
}
