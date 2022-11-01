import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Checkbox from "./Checkbox";

const Dashboard = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);

        setIsCheck(users.map(user => user.id));

        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    let handleClick = e => {
        const {id} = e.target;
        const checked = isCheck.find(item => item === parseInt(id));

        if (checked === parseInt(id)) {
            setIsCheck(isCheck.filter(item => item !== parseInt(id)));
        } else {
            setIsCheck([...isCheck, parseInt(id)]);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.get('/api/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setFirstName(decoded.firstName);
            setLastName(decoded.lastName);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('/api/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setFirstName(decoded.firstName);
            setLastName(decoded.lastName);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const destroyUsers = async (e) => {
        e.preventDefault();

        isCheck.forEach(
            destroyUser
        );
        window.location.reload();
    }

    const destroyUser = async (userId) => {
        try {
            await axiosJWT.delete(`/api/users/${userId}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const blockUsers = async (e) => {
        e.preventDefault();

        isCheck.forEach(
            blockUser
        );
        window.location.reload();
    }

    const blockUser = async (userId) => {
        try {
            await axiosJWT.post(`/api/users/block/${userId}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const setAdminUsers = async (e) => {
        e.preventDefault();

        isCheck.forEach(
            setAdminUser
        );
        window.location.reload();
    }

    const setAdminUser = async (userId) => {
        try {
            await axiosJWT.post(`/api/users/admin/${userId}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    const getUsers = async () => {
        const response = await axiosJWT.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}
        >
            <Box
                sx={{
                    pt:8,
                    pb: 6,
                }}
            >
                <Typography component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                >
                    Welcome Back: {firstName} {lastName}
                </Typography>
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"

                    >
                        <Button key="delete" variant="contained" onClick={destroyUsers}>Delete user</Button>
                        <Button key="block" variant="contained" onClick={blockUsers}>Block user</Button>
                        <Button key="admin" variant="outlined" onClick={setAdminUsers} >Set admin</Button>
                    </Stack>
                </Container>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 750 }} aria-label="simple table" align="center">
                    <TableHead>
                        <TableCell>
                            <Checkbox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={handleSelectAll}
                                isChecked={isCheckAll}
                            />
                        </TableCell>
                        <TableCell>No</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>isBlocked</TableCell>
                        <TableCell>isAdmin</TableCell>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Checkbox
                                        key={user.id}
                                        type="checkbox"
                                        id={user.id}
                                        handleClick={handleClick}
                                        isChecked={isCheck.includes(user.id)}
                                    />
                                </TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{(user.isBlocked || false).toString()}</TableCell>
                                <TableCell>{(user.isAdmin || false).toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default Dashboard
