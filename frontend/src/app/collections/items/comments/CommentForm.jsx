import React, { useState } from "react";
import Box from "@mui/material/Box";

export default function CommentForm({handleSubmit, submitLabel}) {
    const [text, setText] = useState('')
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text);
        setText("");
    }
    return(
        <Box component="form" onSubmit={onSubmit}>
            <textarea
                className={"comment-form-textarea"}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className={"comment-form-button"} disabled={isTextareaDisabled}>{submitLabel}</button>
        </Box>
    );
}
