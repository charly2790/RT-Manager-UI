import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { ThemeProvider } from "@emotion/react";
import { dashboardTheme } from "../themes/dashboardTheme";
import { MiniDrawer } from "./Navbar/MiniDrawer";
import { Box } from "@mui/material";
import { useState } from "react";
import { styles } from './styles'


export const Dashboard = () => {

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let boxWidth = open ? `calc(100% - 240px)` : `100%`;
    let boxColor = open ? `blue` : `red`;    
    let margin =`4% 1% 0% ${open ? `240px` : `80px`}`;        

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Grid container>
                <MiniDrawer handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open}/>
                <Box sx={{ width: boxWidth, margin }}>
                    <Box id="helper" sx={styles.toolbar} /> 
                    <Outlet />
                </Box>
            </Grid>
        </ThemeProvider>
    )
}
