import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import routes from "../../shared/constants/routes";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

export default function CollectionShow() {
    const [collection, setCollection] = useState([]);
    const [items, setItems] = useState([]);
    const collectionId = window.location.pathname.split("/")[2];
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get("/api/collections/" + collectionId).then(res => {
                setCollection(res.data);
                setItems(res.data.items);
            })
            .catch(err => console.log(err));
    }, []);

    const getItems = () => {
        axios.get("/api/collections/" + collectionId + "/items")
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.log(err));
    }

    const deleteItem = async (itemId) => {
        try {
            await axios.delete("/api/collections/" + collectionId + "/items/" + itemId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            getItems();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    };
    const deleteCollection = async (collectionId) => {
        try {
            await axios.delete("/api/collections/" + collectionId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate("/collections");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    };
    const permissionCheck = () => {
        if (user && (user.id === collection.userId || user.isAdmin === true)) {
            return (
                <>
                <Button key="delete" variant="outlined" onClick={() => deleteCollection(collection.id)}>Delete collection</Button>
                <Button key="create_item" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/items/create"}>Add Item</Button>
                </>
        );
        }
    }


    const editPermissionCheck = (item) => {
        if (user && (user.id === collection.userId || user.isAdmin === true)) {
            return (
                <>
                    <TableCell align="right"><Button variant="contained" onClick={() => deleteItem(item.id)}>Delete</Button></TableCell>
                </>
            );
        }
    }

    const editColumnPermissionCheck = () => {
        if (user && (user.id === collection.userId || user.isAdmin === true)) {
            return (
                <>
                    <TableCell align="right">Delete</TableCell>
                </>
            );
        }
    }

    return (

        <div>
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Collection Show
                    </Typography>
                    <Container maxWidth="sm">
                        <Typography variant="h4" align="center" color="text.secondary" paragraph>
                            {collection.collectionName}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {collection.description}
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"

                        >
                            {permissionCheck()}
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="lg">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table" align="center">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Items name</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">View</TableCell>
                                    {editColumnPermissionCheck()}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                                <TableCell component="th" scope="row" >{item.itemName}</TableCell>
                                                 <TableCell></TableCell>
                                                <TableCell align="right"><Button variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/items/" + item.id}>View</Button></TableCell>
                                                {editPermissionCheck(item)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </div>
    );
}
