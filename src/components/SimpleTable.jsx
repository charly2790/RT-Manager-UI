import React, { useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import Box from '@mui/material';

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
// import dayjs from 'dayjs'

// const buttons = [
//     <Button key="first" onClick={() => table.setPageIndex(0)}>Primera</Button>,
//     <Button key="previous" onClick={() => table.previousPage()}>Anterior</Button>,
//     <Button key="follow" onClick={() => table.nextPage()}>Siguiente</Button>,
//     <Button key="last" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última</Button>,
// ];

{/* <button onClick={() => table.setPageIndex(0)}>Primer Página</button>
            <button onClick={() => table.previousPage()}>Anterior</button>
            <button onClick={() => table.nextPage()}>Siguiente</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última Página</button> */}

export const SimpleTable = ({ columns, data }) => {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");


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
        <div>
            {/* <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            /> */}
            <TextField
                id="standard-basic"
                label="Buscar"
                variant="standard"
                value={filtering}
                sx={{ width: '50%', mb: 3 }}
                onChange={(e) => setFiltering(e.target.value)}
            />
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
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

            <ButtonGroup color="primary" aria-label="Medium-sized button group" sx={{mt: 1}}>
                {buttons}
            </ButtonGroup>



        </div>
    )
}
