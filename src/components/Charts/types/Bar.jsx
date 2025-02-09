import { BarChart} from '@mui/x-charts/BarChart';
import { Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

export const Bar = () => {

    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];


    return (
        <Card variant='outlined' sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Kms Semana
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
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
                        borderRadius={8}
                        colors={colorPalette}
                        xAxis={[{
                            scaleType: 'band',
                            categoryGapRatio: 0.5,
                            data: ['1', '2','3','4','5','6','7','8','9','10','11','12','13']
                        }]
                    }
                    series={[
                        {
                            id:'Semana-1',
                            label:'Semana 1',
                            data: [18,18.26,10.82,0,30.81,19.4,31.88,26.29,22,22,17,31.1,20.68],
                            stack: 'A'
                        },
                        {
                            id:'Semana-2',
                            label:'Semana 2',
                            data: [20,23.8,10.48,35.2,12.38,31.88,6,17.29,14.8,13,22.53,24,6,16],
                            stack: 'A'
                        },
                        {
                            id:'Semana-3',
                            label:'Semana 3',
                            data: [18,18.26,10.82,0,30.81,19.4,31.88,26.29,22,22,17,31.1,20.68],
                            stack: 'A'
                        },
                        {
                            id:'Semana-4',
                            label:'Semana 4',
                            data: [18,18.26,10.82,0,30.81,19.4,31.88,26.29,22,22,17,31.1,20.68],
                            stack: 'A'
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    slotProps={{
                        legend: { hidden: false,}
                    }}
                    
                
                    />

                </Stack>
            </CardContent>
        </Card>
    )
}
