import React from 'react'
import { useTable } from '../hooks/useTable';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



export const NakedTable = ({ columns, data }) => {

    const table = useTable({ columns, data });

    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <TableContainer component={Paper} >
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
                                {row.getVisibleCells().map((cell, index) => (
                                    <TableCell key={`${row.id}-${index}`}>                                        
                                        {cell.renderValue('cell')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
