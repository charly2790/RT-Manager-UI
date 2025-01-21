import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom';
import { mainTheme } from '../themes/mainTheme';
import _ from 'lodash';
import { EmptyMessage } from './Shared';

const buttonMessage = {
    'SESIONES': 'Nueva Sesión',
    'USUARIOS': 'Nuevo Usuario',
}

const placeholderMessage = {
    'SESIONES': 'Buscar por fecha, objetivo o tipo de sesión',
    'USUARIOS': 'Buscar por nombre, apellido o correo',
}

export const SimpleTable = ({ columns, data, formParams, tableSettings }) => {

    const {
        defaultSort,
        origin,
        showNewButton } = tableSettings;

    const [sorting, setSorting] = useState([defaultSort]);
    const [filtering, setFiltering] = useState("");
    const [isTableEmpty, setIsTableEmpty] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data.length === 0) {
            setIsTableEmpty(true);
        }
    }, [])

    console.log('data-->', data);


    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(), //Paginación
            //Inicio ordenamiento tabla
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            state: {
                sorting,
                globalFilter: filtering,
            },
            onSortingChange: setSorting,
            //Fin ordenamiento tabla
            onGlobalFilterChange: setFiltering,
            initialState: {
                sorting: [
                    {
                        ...defaultSort
                    },
                ],
            },
        });

    const buttons = [
        <Button key="first" variant="contained" onClick={() => table.setPageIndex(0)}>Primera</Button>,
        <Button key="previous" variant="contained" onClick={() => table.previousPage()}>Anterior</Button>,
        <Button key="follow" variant="contained" onClick={() => table.nextPage()}>Siguiente</Button>,
        <Button key="last" variant="contained" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última</Button>,
    ];

    return (
        <ThemeProvider theme={mainTheme}>
            <Paper sx={{ width: '100%', margin: 'auto', overflow: 'hidden' }}>
                <AppBar
                    position="static"
                    color='default'
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon color="inherit" sx={{ display: 'block' }} />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    disabled={isTableEmpty}
                                    placeholder={!_.isNil(origin) ? placeholderMessage[origin] : ''}
                                    id="standard-basic"
                                    inputProps={{
                                        sx: { fontSize: 'default' },
                                    }}
                                    variant="standard"
                                    value={filtering}
                                    onChange={(e) => setFiltering(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                {
                                    showNewButton
                                        ? <Button
                                            variant='contained'
                                            sx={{ mr: 1 }}
                                            color='primary'
                                            onClick={() => navigate(formParams.route, formParams.params ? { state: { ...formParams.params } } : {})}
                                        >
                                            {!_.isNil(origin) ? buttonMessage[origin] : 'Nuevo'}
                                        </Button>
                                        : null
                                }
                                <Tooltip title="Reload">
                                    <IconButton>
                                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {
                    isTableEmpty
                        ? (<EmptyMessage message={tableSettings.noRecordsMessage} />)
                        : <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        {
                                            table.getHeaderGroups().map(headerGroup => (
                                                <TableRow key={headerGroup.id}>
                                                    {
                                                        headerGroup.headers.map(header => (
                                                            <TableCell key={header.id}
                                                                onClick={header.column.getToggleSortingHandler()}
                                                                sx={{ fontWeight: 'bold' }}
                                                            >
                                                                {header.column.columnDef.header}
                                                                {
                                                                    { asc: '⬆️', desc: '⬇️' }[header.column.getIsSorted() ?? null]
                                                                }
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))
                                        }
                                    </TableHead>
                                    <TableBody>
                                        {table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell, index) => (
                                                    <TableCell key={`${row.id}-${index}`}>
                                                        {/* {console.log(`cell`, cell)} */}
                                                        {/* {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
                                                        {cell.renderValue('cell')}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <ButtonGroup color="primary" aria-label="Medium-sized button group" sx={{ mt: 1, mb: 2 }}>
                                {buttons}
                            </ButtonGroup>
                        </>
                }
            </Paper>
        </ThemeProvider>
    )
}
