import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardActions, CardContent, List, ListItem, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import routes from "../../shared/constants/routes";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";

export default function CollectionIndex() {
    const [collection, setCollection] = useState([]);
    useEffect(() => {
        axios.get("/api/collections")
            .then(res => {
                setCollection(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                    My Collections
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
        </div>
    );
}
