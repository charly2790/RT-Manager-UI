import { parseDate } from "../../helpers"

export const columns = [
    {
      header: "Fecha",
      accessorKey: "fechaSesion",
      sortingFn: (rowA, rowB,columnId) =>{        
        const dateA = rowA.original[columnId].split("-").reverse().join("-");
        const dateB = rowB.original[columnId].split("-").reverse().join("-");
        return dateA.localeCompare(dateB);
      }      
    },
    {
      header: "Id Sesión",
      accessorKey: "idSesion",
    },
    {
      header: "Objetivo",
      accessorKey: "Objetivo",
    },
    {
      header: "Tipo",
      accessorKey: "tipo",
    },{
      header: "Estado",
      accessorKey: "estado",
    },{
      header: "Acciones",
      accessorKey: "acciones",
      show: false,
    },{
      header: "Filtro Estado",
      accessorKey:"estadoFilter",      
    }
  ];

  export const defaultSort =  { id: "fechaSesion", desc: true };

  export const hiddenColumns = {
    estadoFilter: false,
  }