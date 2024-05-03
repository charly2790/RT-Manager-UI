import { Button } from "@mui/material"
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { ThemeProvider } from "@emotion/react";
import { dashboardTheme } from "../themes/dashboardTheme";
import { MiniDrawer } from "./Navbar/MiniDrawer";

export const Dashboard = () => {

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Grid container>
                <MiniDrawer />
                <Outlet />
            </Grid>
        </ThemeProvider>
    )
}
