import React from 'react'
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { BasicMenu } from '../BasicMenu/BasicMenu';
import { useState } from 'react';


export const NotificationBell = ({ iconColor, badgeContent, onClick, anchorEl }) => {
    const notifications = `Tenés ${badgeContent} nuevas notificaciones`;
    const noNotifications = 'No hay nuevas notificaciones';
    const [open, setOpen] = useState(false);
    const [anchorE1, setAnchorE1] = useState(null);
    const handleOpen = (event) => {
        setAnchorE1(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const notificaciones = [
        {
            id:0,
            label:'notificacion 1'
        },
        {
            id:1,
            label: 'notificacion 2'
        }];
    return (
        <>
            <Tooltip title={notificaciones.length ? notifications : noNotifications} arrow>
                <IconButton
                    aria-label="cart"
                    color={iconColor}
                    onClick={notificaciones.length? handleOpen:null}
                // anchorEl={anchorEl}
                >
                    <Badge
                        badgeContent={notificaciones.length}
                        color={iconColor}>
                        <NotificationsIcon color="action" />
                    </Badge>
                </IconButton>
            </Tooltip>
            <BasicMenu
                anchorE1={anchorE1} //positioning
                open={open} //indica si el menú es expandido o collapsado
                handleClose={handleClose}
                menuItems={notificaciones}
            />
        </>
    )
}
