import { Button } from "@mui/material"
import { Navbar } from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { ThemeProvider } from "@emotion/react";
import { dashboardTheme } from "../themes/dashboardTheme";

export const Dashboard = () => {

    return (
        <ThemeProvider theme={dashboardTheme}>
            <Grid container>
                <Navbar />
                <Outlet />
            </Grid>
        </ThemeProvider>
    )
}
