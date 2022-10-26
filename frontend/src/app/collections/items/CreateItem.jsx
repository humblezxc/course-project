// Create Item Component for Collections
// This component is used to create a new item in a collections with fields: itemName, collectionId, digit_1_value:INTEGER, digit_2_value:INTEGER, digit_3_value:INTEGER, string_1_value:STRING, string_2_value:STRING, string_3_value:STRING, text_1_value:TEXT, text_2_value:TEXT, text_3_value:TEXT, boolean_1_value:BOOLEAN, boolean_2_value:BOOLEAN, boolean_3_value:BOOLEAN, date_1_value:DATE, date_2_value:DATE, date_3_value:DATE
// do not use class based components for this, use functional components with hooks
// use material ui for styling

import React, { useState } from "react";
import {useNavigate, withRouter} from "react-router-dom";
// import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { DatePicker } from '@mui/material/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/material/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/material/x-date-pickers/LocalizationProvider';

import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import {Numbers} from "@mui/icons-material";

export default function CreateItem() {
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         '& > *': {
    //             margin: theme.spacing(1),
    //             width: '25ch',
    //         },
    //     },
    // }));

    // const classes = useStyles();
    const [itemName, setItemName] = useState("");
    const [digit_1_value, setDigit_1_value] = useState(null);
    const [digit_2_value, setDigit_2_value] = useState(null);
    const [digit_3_value, setDigit_3_value] = useState(null);
    const [string_1_value, setString_1_value] = useState(null);
    const [string_2_value, setString_2_value] = useState(null);
    const [string_3_value, setString_3_value] = useState(null);
    const [text_1_value, setText_1_value] = useState(null);
    const [text_2_value, setText_2_value] = useState(null);
    const [text_3_value, setText_3_value] = useState(null);
    const [boolean_1_value, setBoolean_1_value] = useState(null);
    const [boolean_2_value, setBoolean_2_value] = useState(null);
    const [boolean_3_value, setBoolean_3_value] = useState(null);
    const [date_1_value, setDate_1_value] = useState(null);
    const [date_2_value, setDate_2_value] = useState(null);
    const [date_3_value, setDate_3_value] = useState(null);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const collectionId = window.location.pathname.split("/")[2];

        const newItem = {
            itemName,
            collectionId,
            digit_1_value,
            digit_2_value,
            digit_3_value,
            string_1_value,
            string_2_value,
            string_3_value,
            text_1_value,
            text_2_value,
            text_3_value,
            boolean_1_value,
            boolean_2_value,
            boolean_3_value,
            date_1_value,
            date_2_value,
            date_3_value
        };
        try {
            await axios.post(`/api/collections/${collectionId}/items`, newItem);
            // redirect to /collections after creating a new item
            navigate("/collections/" + collectionId);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <h1>Create Item</h1>
            <Box component="form" autoComplete="off" noValidate onSubmit={onSubmit} sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <TextField id="standard-basic" label="Item Name" onChange={e => setItemName(e.target.value)} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="number" label="Digit 1 Value" onChange={e => setDigit_1_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="number" label="Digit 2 Value" onChange={e => setDigit_2_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="number" label="Digit 3 Value" onChange={e => setDigit_3_value(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="string" label="String 1 Value" onChange={e => setString_1_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="string" label="String 2 Value" onChange={e => setString_2_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="string" label="String 3 Value" onChange={e => setString_3_value(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="text" label="Text 1 Value" onChange={e => setText_1_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="text" label="Text 2 Value" onChange={e => setText_2_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField id="standard-basic" type="text" label="Text 3 Value" onChange={e => setText_3_value(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Checkbox id="standard-basic" type="checkbox" label="Boolean 1 Value" onChange={e => setBoolean_1_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Checkbox id="standard-basic" type="checkbox" label="Boolean 2 Value" onChange={e => setBoolean_2_value(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Checkbox id="standard-basic" type="checkbox" label="Boolean 3 Value" onChange={e => setBoolean_3_value(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        {/*<TextField*/}
                        {/*    id="datetime-local"*/}
                        {/*    label="Next appointment"*/}
                        {/*    type="datetime-local"*/}
                        {/*    sx={{ width: 250 }}*/}
                        {/*    InputLabelProps={{*/}
                        {/*        shrink: true,*/}
                        {/*    }}*/}
                        {/*        onChange={(newValue) => {*/}
                        {/*            setDate_1_value(newValue);*/}
                        {/*        }}*/}
                        {/*/>*/}

                        {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                        {/*    <DatePicker*/}
                        {/*        label="Basic example"*/}
                        {/*        value={date_1_value}*/}
                        {/*        onChange={(newValue) => {*/}
                        {/*            setDate_1_value(newValue);*/}
                        {/*        }}*/}
                        {/*        renderInput={(params) => <TextField {...params} />}*/}
                        {/*    />*/}
                        {/*</LocalizationProvider>*/}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/*<DatePicker id="standard-basic" type="date" label="Date 2 Value" onChange={e => setDate_2_value(e.target.value)} renderInput={(params) => <TextField {...params} />}*/}
                        {/*/>*/}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/*<DatePicker id="standard-basic" type="date" label="Date 3 Value" onChange={e => setDate_3_value(e.target.value)} renderInput={(params) => <TextField {...params} />}*/}
                        {/*/>*/}
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Create Item
                </Button>
            </Box>
        </Container>
    )
}
