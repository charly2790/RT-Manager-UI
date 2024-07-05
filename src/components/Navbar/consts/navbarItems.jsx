import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SettingsIcon from '@mui/icons-material/Settings';
import WatchIcon from '@mui/icons-material/Watch';

export const navbarItems = [{
    id:0,
    icon: <PeopleIcon/>,
    label:'Alumnos',
    route: 'alumnos'
},
{
    id:1,
    icon:<SportsScoreIcon/>,
    label:'Carreras',
    route: 'carreras'
},
{
    id:2,
    icon:<SettingsIcon/>,
    label:'Ajustes',
    route: 'ajustes'
},
{
    id:3,
    icon:<WatchIcon/>,
    label:'Planificación',
    route: 'sesiones'
}
]