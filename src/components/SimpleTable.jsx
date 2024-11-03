import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

export const SimpleTable = ({ columns, data, formParams }) => {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const navigate = useNavigate();


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
        });

    const buttons = [
        <Button key="first" variant="contained" onClick={() => table.setPageIndex(0)}>Primera</Button>,
        <Button key="previous" variant="contained" onClick={() => table.previousPage()}>Anterior</Button>,
        <Button key="follow" variant="contained" onClick={() => table.nextPage()}>Siguiente</Button>,
        <Button key="last" variant="contained" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última</Button>,
    ];

    return (
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
                                placeholder='Buscar por email, número telefónico o id usuario'
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
                            <Button
                                variant='contained'
                                sx={{ mr: 1 }}
                                onClick={() => navigate(formParams.route, formParams.params ? { state: { ...formParams.params} } : {})}
                            >
                                Agregar Usuario
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
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
                                                sx={{fontWeight: 'bold'}}
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
                    {/* <tfoot>
                        {
                            table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map(footer => (
                                        <th key={footer.id}>
                                            <th>
                                                {footer.column.columnDef.footer}
                                            </th>
                                        </th>
                                    ))

                                    }
                                </tr>
                            ))
                        }
                    </tfoot> */}
                </Table>
            </TableContainer>

            <ButtonGroup color="primary" aria-label="Medium-sized button group" sx={{ mt: 1 }}>
                {buttons}
            </ButtonGroup>



        </Paper>
    )
}
