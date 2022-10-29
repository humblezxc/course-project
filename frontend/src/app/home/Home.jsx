import React, {useEffect, useState} from "react";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import routes from "../../shared/constants/routes";
import axios from "axios";

const theme = createTheme();

export default function Home() {
    const [items, setItems] = useState([]);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        axios.get("/api/collections")
            .then(res => {
                setCollection(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        axios.get("/api/items")
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
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
                            Last items
                        </Typography>
                    </Box>
                    <Container maxWidth="md">
                        <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 750 }} aria-label="simple table" align="center">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Items name</TableCell>
                                        <TableCell align="center">Collection name</TableCell>
                                        <TableCell align="right">Author</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" >{item.itemName}</TableCell>
                                            <TableCell align="center">Collection name</TableCell>
                                            <TableCell align="right">Author name</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
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
                            Top 5 Collections
                        </Typography>
                        <List>
                            {collection.map((collection) => (
                                <ListItem key={collection.id}>
                                    <Card sx={{ width: 675}}>
                                        <CardContent>
                                            <Typography variant="h3" component="div">
                                                { collection.collectionName}
                                            </Typography>
                                            <Typography variant="h5" color="text.secondary">
                                                {collection.description}
                                            </Typography>
                                        </CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={9}>
                                                <CardActions>
                                                    <Button size="small" href={routes.COLLECTIONS + "/" + collection.id}>Learn More</Button>
                                                </CardActions>
                                            </Grid>
                                            <Grid item xs={12} sm={1}>
                                                <CardActions>
                                                    <Button size="small" variant="outlined" color="warning" href={routes.COLLECTIONS + "/" + collection.id + "/edit"}>
                                                        Edit
                                                    </Button>
                                                    <Button  size="small" variant="outlined" color="error" href={routes.COLLECTIONS + "/" + collection.id + "/delete"}>
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
