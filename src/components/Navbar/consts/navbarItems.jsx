import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SettingsIcon from '@mui/icons-material/Settings';
import WatchIcon from '@mui/icons-material/Watch';
import BarChartIcon from '@mui/icons-material/BarChart';

export const navbarItems = [{
    id:0,
    icon: <PeopleIcon/>,
    label:'Alumnos',
    route: 'alumnos',
    allowedRoles: ['EQUIPO_ADMIN']
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
    allowedRoles: ['EQUIPO_ADMIN', 'EQUIPO_MEMBER']
},
{
    id: 4,
    icon: <BarChartIcon />,
    label: 'Performances',
    route: 'alumnos-performance',
    allowedRoles: ['EQUIPO_ADMIN']
}
]