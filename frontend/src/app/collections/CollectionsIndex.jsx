// Create Collection Index Component
// Import React
// use mui cards component to display collection cards
// each card should have a name and description.
// each card should have a button to view the collection and to edit and destroy the collection
import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardActionArea, CardContent, List, ListItem, ListItemText, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import routes from "../../shared/constants/routes";

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
            <h1>Collection Index</h1>
            <List>
                {collection.map((collection) => (
                    <ListItem key={collection.id}>
                        <Card sx={{width: 300, height: 300}}>
                            <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { collection.collectionName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {collection.description}
                                </Typography>
                            <Button variant="contained" href={routes.COLLECTIONS + "/" + collection.id}>View</Button>
                            <Button variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/edit"}>Edit</Button>
                            <Button variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/delete"}>Delete</Button>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
