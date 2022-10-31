// Create Item Component for Collections
// This component is used to create a new item in a collections with fields: itemName, collectionId, digit_1_value:INTEGER, digit_2_value:INTEGER, digit_3_value:INTEGER, string_1_value:STRING, string_2_value:STRING, string_3_value:STRING, text_1_value:TEXT, text_2_value:TEXT, text_3_value:TEXT, boolean_1_value:BOOLEAN, boolean_2_value:BOOLEAN, boolean_3_value:BOOLEAN, date_1_value:DATE, date_2_value:DATE, date_3_value:DATE
// do not use class based components for this, use functional components with hooks
// use material ui for styling

import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateItem() {

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

    const createItem = async (e) => {
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
            await axios.post(`/api/collections/${collectionId}/items`, newItem, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            navigate("/collections/" + collectionId);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
                    New item
                </Typography>
                <Box
                    component="form"
                    onSubmit={createItem}
                    sx={{
                        mt: 3
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <Grid paddingBottom={2}>
                        <TextField id="standard-basic" fullWidth label="Item Name" variant="outlined" onChange={e => setItemName(e.target.value)} />
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <h3>Integer fields</h3>
                                <Grid paddingBottom={2}>
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number" label="Digit 1 Value" onChange={e => setDigit_1_value(e.target.value)} />
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number" label="Digit 2 Value" onChange={e => setDigit_2_value(e.target.value)} />
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number" label="Digit 3 Value" onChange={e => setDigit_3_value(e.target.value)} />
                                </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>String fields</h3>
                                <Grid paddingBottom={2}>
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label="String 1 Value" onChange={e => setString_1_value(e.target.value)} />
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label="String 2 Value" onChange={e => setString_2_value(e.target.value)} />
                                    <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label="String 3 Value" onChange={e => setString_3_value(e.target.value)} />
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h3>Text fields</h3>
                            <Grid paddingBottom={2}>
                                <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label="Text 1 Value" onChange={e => setText_1_value(e.target.value)} />
                                <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label="Text 2 Value" onChange={e => setText_2_value(e.target.value)} />
                                <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label="Text 3 Value" onChange={e => setText_3_value(e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>Date fields</h3>
                            <Grid paddingBottom={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label="Basic example"
                                        value={date_1_value}
                                        onChange={e => setDate_1_value(e.target.value)}
                                        renderInput={(params) => <TextField sx={{mb: 1}}  {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mb: 1}}
                                        label="Basic example"
                                        onChange={e => setDate_2_value(e.target.value)}
                                        renderInput={(params) => <TextField sx={{mb: 1}} {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mb: 1}}
                                        label="Basic example"
                                        onChange={e => setDate_3_value(e.target.value)}
                                        renderInput={(params) => <TextField sx={{mb: 1}} {...params} />}
                                    />
                                </LocalizationProvider>
                                    {/*<TextField*/}
                                    {/*    id="datetime-local"*/}
                                    {/*    label="Next appointment"*/}
                                    {/*    type="datetime-local"*/}
                                    {/*    sx={{ width: 250 }}*/}
                                    {/*    InputLabelProps={{*/}
                                    {/*        shrink: true,*/}
                                    {/*    }}*/}
                                    {/*    onChange={(newValue) => {*/}
                                    {/*        setDate_1_value(newValue);*/}
                                    {/*    }}*/}
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
                                    {/*<DatePicker id="standard-basic" type="date" label="Date 2 Value" onChange={e => setDate_2_value(e.target.value)} renderInput={(params) => <TextField {...params} />}*/}
                                    {/*/>*/}
                                    {/*<DatePicker id="standard-basic" type="date" label="Date 3 Value" onChange={e => setDate_3_value(e.target.value)} renderInput={(params) => <TextField {...params} />}*/}
                                    {/*/>*/}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h3>Boolean fields</h3>
                            <FormControlLabel sx={{mb: 1}} fullWidth control={<Checkbox id="standard-basic" type="checkbox" onChange={e => setBoolean_1_value(e.target.value)}/>} label="Boolean 1 Value"/>
                            <FormControlLabel sx={{mb: 1}} fullWidth control={<Checkbox id="standard-basic" type="checkbox" label="Boolean 2 Value" onChange={e => setBoolean_2_value(e.target.value)}/>} label="Boolean 2 Value" />
                            <FormControlLabel fullWidth control={<Checkbox id="standard-basic" type="checkbox" label="Boolean 3 Value" onChange={e => setBoolean_3_value(e.target.value)}/>} label="Boolean 3 Value" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 3 }}
                            >
                                Create item
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
