import React, {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent, List, ListItem, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import routes from "../../shared/constants/routes";

export default function CollectionsAll() {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        axios.get("/api/collections/all")
            .then(res => {
                setCollection(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    return(
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
                    All collections
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
                                </Grid>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
}
