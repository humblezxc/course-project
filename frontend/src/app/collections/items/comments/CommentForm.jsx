import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function CommentForm({handleSubmit, submitLabel}) {
    const [text, setText] = useState('')
    const isTextareaDisabled = text.length === 0;

    const sendComment = (e) => {
        e.preventDefault();
        handleSubmit(text);
        setText("");
    }
    return(
        <Box type={"form"}
            sx={{
                pt:2,
                pb: 2,
            }}
        >
             <Grid minWidth="420px">
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    className={"comment-form-textarea"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </Grid>
            <Grid mt="1em">
                <Button variant="outlined" disabled={isTextareaDisabled} onClick={sendComment}>{submitLabel}</Button>
            </Grid>
        </Box>
    );
}
