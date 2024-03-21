import { Button } from "@mui/material"
import { Navbar } from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';

export const App = () => {

  return (
    <Grid container>
        <Navbar/>
        <Outlet/>        
    </Grid>
  )
}
