import React, {useEffect, useState} from "react";
import Comment from "./Comment";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommentForm from "./CommentForm";
import {Typography} from "@mui/material";

export default function Comments({}) {
    const [comments, setComments] = useState([]);

    const collectionId = window.location.pathname.split("/")[2];
    const itemId = window.location.pathname.split("/")[4];

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("/api/collections/" + collectionId + "/items/" + itemId + "/comments")
                .then(res => {
                    setComments(res.data);
                })
                .catch(err => console.log(err));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const addComment = async (text) => {
        try {
            await axios.post("/api/collections/" + collectionId + "/items/" + itemId + "/comments", {
                body: text
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
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
                    pb: 6,
                }}
            >
                <Typography component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                >
                    Comments
                </Typography>
            </Box>
            <Typography component="h2"
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
            >
                Write a comment
            </Typography>
            <CommentForm submitLabel={"write"} handleSubmit={addComment}/>
            <Grid xs={12} sm={12}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </Grid>
        </Box>
    );
}
