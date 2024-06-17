import React, { useEffect, useState } from 'react'
import { useTable } from '../../../hooks/useTable';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    {
        header: "Fecha",
        accessorKey: "fechaSesion",
    },
    {
        header: "Objetivo",
        accessorKey: "Objetivo",
    },
    {
        header: "Tipo de Sesion",
        accessorKey: "idTipoSesion",
    },
    {
        header: "Acciones",
        accessorKey: "acciones",
    }
]

export const SesionesTable = ({ data, handleDeleteSesion }) => {

    const table = useTable({ columns, data });

        return (
            <Paper sx={{ width:'90%', margin: 'auto', overflow: 'hidden' }}>
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
