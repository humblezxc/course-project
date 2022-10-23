import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import { List, ListItem, ListItemText} from "@mui/material";
import Button from "@mui/material/Button";
import routes from "../../shared/constants/routes";

export default function collectionShow() {
    const [collection, setCollection] = useState([]);
    const [items, setItems] = useState([]);
    const collectionId = window.location.pathname.split("/")[2];

    useEffect(() => {
        axios.get("/collections/" + collectionId)
            .then(res => {
                setCollection(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        axios.get("/collections/" + collectionId + "/items")
            .then(res => {
                setItems(res.data);
            })
            .catch(err => console.log(err));
    }

    const deleteItem = async (itemId) => {
        try {
            await axios.delete("/collections/" + collectionId + "/items/" + itemId)
            getItems();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1>Collection Show</h1>
            <p>{collection.collectionName}</p>
            <p>{collection.description}</p>
            <Button key="edit" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/edit"}>Edit</Button>
            <Button key="delete" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/delete"}>Delete</Button>

            <Button key="create_item" variant="contained" href={routes.COLLECTIONS + "/" + collection.id + "/items/create"}>Add Item</Button>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.itemName} secondary={item.description}/>
                        <Button variant="contained" href={routes.ITEMS + "/" + item.id}>View</Button>
                        <Button variant="contained" href={routes.ITEMS + "/" + item.id + "/edit"}>Edit</Button>
                        <Button variant="contained" onClick={() => deleteItem(item.id)}>Delete</Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
