import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const BasicMenu = ({ anchorE1, open, handleClose, menuItems }) => {    
    return (
        <div>            
            <Menu
                id="basic-menu"
                //anchorEl={ anchorE1 }
                open={ open }
                onClose={ handleClose }                
            >
                {menuItems.map((item)=>{
                    return <MenuItem
                        onClick={handleClose}
                    >
                        {item.label}
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}
