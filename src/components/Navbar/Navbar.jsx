import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import { navbarItems } from './consts/navbarItems';
import { Styles } from '../../styles.js';
import { useNavigate} from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();
    
    return (
        <Drawer
            sx={Styles.drawer}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                {navbarItems.map((text, index) => (
                    <ListItem
                    button 
                    key={text.id}
                    onClick={()=>navigate(text.route)} 
                    disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                            sx={Styles.icons}>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText 
                            sx={Styles.text}
                            primary={text.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
