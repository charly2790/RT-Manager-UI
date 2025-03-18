import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SettingsIcon from '@mui/icons-material/Settings';
import WatchIcon from '@mui/icons-material/Watch';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DatasetIcon from '@mui/icons-material/Dataset';

export const navbarItems = [{
    id:0,
    icon: <PeopleIcon/>,
    label:'Alumnos',
    route: 'alumnos',
    allowedRoles: ['EQUIPO_ADMIN'],
    nestedList: []
},
/* {
    id:1,
    icon:<SportsScoreIcon/>,
    label:'Carreras',
    route: 'calendario-carreras',
    allowedRoles: ['EQUIPO_ADMIN','EQUIPO_MEMBER']
}, */
/* {
    id:2,
    icon:<SettingsIcon/>,
    label:'Ajustes',
    route: 'settings',
    allowedRoles: ['EQUIPO_ADMIN']
}, */
{
    id:3,
    icon:<WatchIcon/>,
    label:'Planificación',
    route: 'sesiones',
    allowedRoles: ['EQUIPO_ADMIN', 'EQUIPO_MEMBER'],
    nestedList:[]
},
{
    id: 4,
    icon: <BarChartIcon />,
    label: 'Performances',
    route: 'alumnos-performance',
    allowedRoles: ['EQUIPO_ADMIN'],
    nestedList: [
        {
            id: 5,
            icon: <CalendarMonthIcon/>,
            label: 'Kms periodo',
            route: 'alumnos-performance',
            allowedRoles: ['EQUIPO_ADMIN'],
        },
        {
            id: 6,
            icon: <DateRangeIcon/>,
            label: 'Kms semana',
            route: 'alumnos-performance',
            allowedRoles: ['EQUIPO_ADMIN'],
        },
        {
            id: 7,
            icon: <DatasetIcon/>,
            label: 'Resumen',
            route: 'alumnos-performance',
            allowedRoles: ['EQUIPO_ADMIN'],
        }
    ]   
}
]