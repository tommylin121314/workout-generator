import React from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"

const Navbar = () => {
    return <div>
        <AppBar position='fixed' sx={{height: "60px"}}>
            <Toolbar>
                <FitnessCenter/>
                <Stack direction="row" spacing={8} sx={{marginLeft: "64px", flexGrow: 1}}>
                    <Typography variant="h6">Home</Typography>
                    <Typography variant="h6">Explore</Typography>
                    <Typography variant="h6">Library</Typography>
                </Stack>
                <Stack direction="row" spacing={12} sx={{marginRight: "64px"}}>
                    <Typography variant="h6">Login</Typography>
                    <Typography variant="h6">Sign up</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    </div>
}

export default Navbar;