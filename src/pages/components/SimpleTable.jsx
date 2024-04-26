import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
// import dayjs from 'dayjs'


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

    return (
        <div>
            <input
                type="text"
                value={filtering}
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
            <button onClick={() => table.setPageIndex(0)}>Primer Página</button>
            <button onClick={() => table.previousPage()}>Anterior</button>
            <button onClick={() => table.nextPage()}>Siguiente</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última Página</button>

        </div>
    )
}
