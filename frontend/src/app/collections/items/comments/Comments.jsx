import React, {useEffect, useState} from "react";
import Comment from "./Comment";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommentForm from "./CommentForm";

export default function Comments({currentUserId}) {
    const [comments, setComments] = useState([]);
    const [items, setItems] = useState([]);

    const collectionId = window.location.pathname.split("/")[2];
    const itemId = window.location.pathname.split("/")[4];

    useEffect(() => {
        axios.get("/api/collections/" + collectionId + "/items/" + itemId + "/comments")
            .then(res => {
                setComments(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    const addComment = async (text) => {
        console.log("addComment", text);
        try {
            await axios.post("/api/collections/" + collectionId + "/items/" + itemId + "/comments", {
                body: text,
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    return(
        <Box className={"comments"}>
            <h3 className={"comments-title"}>Comments</h3>
            <Grid className={"comment-form-title"}>Write comment</Grid>
            <CommentForm submitLabel={"write"} handleSubmit={addComment}/>
            <Grid className={"comments-container"}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </Grid>
        </Box>
    );
}
