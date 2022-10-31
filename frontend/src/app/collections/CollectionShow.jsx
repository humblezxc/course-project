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
                            <Button  key="edit" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/edit"}>Edit collection</Button>
                            <Button key="delete" variant="outlined" onClick={() => deleteCollection(collection.id)}>Delete collection</Button>
                            <Button key="create_item" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/items/create"}>Add Item</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="lg">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table" align="center">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Items name</TableCell>
                                    <TableCell>Items data</TableCell>
                                    <TableCell align="right">View</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                                <TableCell component="th" scope="row" >{item.itemName}</TableCell>
                                                 <TableCell>item data</TableCell>
                                                <TableCell align="right"><Button variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/items/" + item.id}>View</Button></TableCell>
                                                <TableCell align="right"><Button variant="outlined" href={routes.COLLECTIONS + "/" + collection.id + "/" + item.id + "/edit"}>Edit</Button></TableCell>
                                                <TableCell align="right"><Button variant="contained" onClick={() => deleteItem(item.id)}>Delete</Button></TableCell>
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
