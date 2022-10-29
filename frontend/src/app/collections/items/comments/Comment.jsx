import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function Comment({comment}) {
    return(
        <Box
            sx={{
                bgcolor: 'background.primary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt:2,
                pb: 6,
            }}
        >
            <container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value="Username" variant="standard" InputProps={{
                            readOnly: true,
                        }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         <TextField fullWidth value={comment.createdAt} variant="standard" InputProps={{
                             readOnly: true,
                         }}/>
                    </Grid>
                </Grid>
                <Box sx={ {
                    pt:2,
                }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        minRows={4}
                        value={comment.body}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </container>
      </Box>
    );
}
