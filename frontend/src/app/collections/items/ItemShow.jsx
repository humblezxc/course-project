import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Comments from "./comments/Comments";

export default function ItemShow () {
    const [item, setItem] = useState({});
    const collectionId = window.location.pathname.split("/")[2];
    const itemId = window.location.pathname.split("/")[4];
    const [collection, setCollection]  = useState({});
    const enabledKeys = Object.keys(collection).filter(field => field.includes('enabled') && collection[field] === true)
    const enabledFields = enabledKeys.map(key => (
            {
                key: `${key.slice(0, key.length - 8)}_value`,
                title: collection[`${key.slice(0, key.length - 8)}_name`],
                boolean: key.includes('boolean')
            }
        )
    );
    console.log(enabledFields)

    useEffect(() => {
        axios.get("/api/collections/" + collectionId + "/items/" + itemId)
            .then(res => {
                setItem(res.data);
                setCollection(res.data.collection);
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
                {enabledFields.map((field) => (
                    <Typography component="h2"
                                variant="h4"
                                align="center"
                                color="text.primary"
                                gutterBottom
                    >
                        {field.title}
                        <Typography component="h2"
                                    variant="h5"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                        >
                            {(item[field.key]|| true).toString()}
                        </Typography>
                    </Typography>
                ))}
            <Comments/>
        </Box>
        </Box>
    );
}
