import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Comments from "./comments/Comments";

export default function ItemShow () {
    const [item, setItem] = useState([]);
    const collectionId = window.location.pathname.split("/")[2];
    const itemId = window.location.pathname.split("/")[4];

    useEffect(() => {
        axios.get("/api/collections/" + collectionId + "/items/" + itemId)
            .then(res => {
                setItem(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1"
                            variant="h1"
                            align="center"
                            color="text.primary"
                            gutterBottom
                >
                    {item.itemName}
                </Typography>
            <Comments currentUserId={1}/>
        </Box>
        </Box>
    );
}
