import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Styles } from '../styles.js'
import React from 'react'

export const SimpleMenuOption = ({ item, navigate, styles }) => {

    return <>
        <ListItemButton
            key={ item.id }
            onClick={() => navigate(item.route)}
            sx = {{ ...styles }}
        >
            <ListItemIcon sx={Styles.icons}>
                {item.icon}
            </ListItemIcon>
            <ListItemText sx={Styles.text} primary={item.label} />
        </ListItemButton>
    </>
}
