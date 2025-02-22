import { BarChart} from '@mui/x-charts/BarChart';
import { Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import _ from 'lodash';
import { xAxis } from '../../../performances/types';

export const Bar = ({data, options}) => {
        
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
                            data: xAxis
                        }]
                    }
                    series={series}
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
