import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function ApplicationBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const routeDashboard = () => {
        navigate("/dashboard");
    }
    const routeUserCollections = () => {
        navigate("/collections");
    }
    const routeLogin = () => {
        navigate("/login");
    }
    const Logout = async () => {
        try {
            await axios.delete("/api/logout")
            localStorage.setItem('user', null)
            localStorage.setItem('token', null)

            navigate("/login");

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const Dashboard = () => {
        if (user?.isAdmin ){
            return <Link
                variant="button"
                color="text.primary"
                onClick={routeDashboard}
                sx={{ my: 1, mx: 1.5 }}
            >
                Dashboard
            </Link>
        }
    }

    const userCollection = () => {
        if (user){
            return <Link
                variant="button"
                color="text.primary"
                onClick={routeUserCollections}
                sx={{ my: 1, mx: 1.5 }}
            >
                My collections
            </Link>
        }
    }

    const renderAuthButton = () => {
        if (token === 'null') {
            return <Button onClick={routeLogin} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
            </Button>;
        } else {
            return <Button onClick={Logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Logout
            </Button>;
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Course project
                    </Typography>
                    <nav>
                        {Dashboard()}
                        {userCollection()}
                        <Link
                            variant="button"
                            color="text.primary"
                            href="/collections/all"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            All collections
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="/"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Home
                        </Link>
                    </nav>
                    {renderAuthButton()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
