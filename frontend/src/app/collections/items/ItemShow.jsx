import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {ListItem, ListItemText} from "@mui/material";
import Button from "@mui/material/Button";
import routes from "../../../shared/constants/routes";
import Comments from "./comments/Comments";

export default function ItemShow () {
    const [item, setItem] = useState([]);
    const collectionId = window.location.pathname.split("/")[2];
    const itemId = window.location.pathname.split("/")[4];

    useEffect(() => {
        axios.get("/collections/" + collectionId + "/items/" + itemId)
            .then(res => {
                setItem(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <Box>
            <h1>{item.itemName}</h1>
            <Comments currentUserId={1}/>
        </Box>
    );
}
