import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Styles } from '../styles.js'
import React, { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SimpleMenuOption } from './simpleMenuOption.jsx';

export const ComplexMenuOption = ({ item, navigate }) => {

    const [open, setOpen] = useState(false);
    const { nestedList = [] } = item;

    const handleClick = () => {
        setOpen(!open);
    }

    return <>
        <ListItemButton
            key={item.index}
            onClick={handleClick}
        >
            <ListItemIcon sx={Styles.icons}>
                {item.icon}
            </ListItemIcon>
            <ListItemText sx={Styles.text} primary={item.label} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    nestedList.map((subItem, index) => (
                        <SimpleMenuOption
                            item = { subItem }
                            navigate = { navigate }
                            styles = {{ pl: 3 }}
                        />
                    ))
                }
            </List>
        </Collapse>
    </>
}
