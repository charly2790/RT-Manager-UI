import {
    useReactTable,
    getCoreRowModel,    
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { useState } from 'react';



export const useTable = ({columns, data}) => {
  
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
        
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),            
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            state: {
                sorting,
                globalFilter: filtering,
            },
            onSortingChange: setSorting,            
            onGlobalFilterChange: setFiltering,
        }
    )
  
  
    return table;
}
