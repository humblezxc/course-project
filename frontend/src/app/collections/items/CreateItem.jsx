// Create Item Component for Collections
// This component is used to create a new item in a collections with fields: itemName, collectionId, digit_1_value:INTEGER, digit_2_value:INTEGER, digit_3_value:INTEGER, string_1_value:STRING, string_2_value:STRING, string_3_value:STRING, text_1_value:TEXT, text_2_value:TEXT, text_3_value:TEXT, boolean_1_value:BOOLEAN, boolean_2_value:BOOLEAN, boolean_3_value:BOOLEAN, date_1_value:DATE, date_2_value:DATE, date_3_value:DATE
// do not use class based components for this, use functional components with hooks
// use material ui for styling

import React, {useEffect, useState} from "react";
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
    const [collection, setCollection] = useState([]);
    const collectionId = window.location.pathname.split("/")[2];

    useEffect(() => {
        axios.get("/api/collections/" + collectionId).then(res => {
            setCollection(res.data);
        })
            .catch(err => console.log(err));
    }, []);

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

                    <Grid paddingBottom={10}>
                        <TextField id="standard-basic" fullWidth label="Item Name" variant="outlined" onChange={e => setItemName(e.target.value)} />
                    </Grid>

                    <Grid>

                                    { collection.digit_1_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number"
                                                label={collection.digit_1_name} onChange={e => setDigit_1_value(e.target.value)}/>}
                                    { collection.digit_2_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number"
                                                label={collection.digit_2_name}
                                                onChange={e => setDigit_2_value(e.target.value)}/>}
                                    { collection.digit_3_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="number" label={collection.digit_3_name} onChange={e => setDigit_3_value(e.target.value)} />}

                                    { collection.string_1_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label={collection.string_1_name} onChange={e => setString_1_value(e.target.value)} />}
                                    { collection.string_2_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label={collection.string_2_name} onChange={e => setString_2_value(e.target.value)} />}
                                    { collection.string_3_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="string" label={collection.string_3_name} onChange={e => setString_3_value(e.target.value)} />}
                                { collection.text_1_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label={collection.text_1_name} onChange={e => setText_1_value(e.target.value)} />}
                                { collection.text_2_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label={collection.text_2_name} onChange={e => setText_2_value(e.target.value)} />}
                                { collection.text_3_enabled && <TextField fullWidth sx={{mb: 1}} id="standard-basic" type="text" label={collection.text_3_name} onChange={e => setText_3_value(e.target.value)} />}

                                {collection.date_1_enabled && <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label={collection.date_1_name}
                                        value={date_1_value}
                                        onChange={e => setDate_1_value(e.target.value)}
                                        renderInput={(params) => <TextField fullWidth sx={{mb: 1}}  {...params} />}
                                    />
                                </LocalizationProvider>}
                                {collection.date_2_enabled && <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mb: 1}}
                                        label={collection.date_2_name}
                                        onChange={e => setDate_2_value(e.target.value)}
                                        renderInput={(params) => <TextField fullWidth sx={{mb: 1}} {...params} />}
                                    />
                                    </LocalizationProvider>}
                                {collection.date_3_enabled && <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{mb: 1}}
                                        label={collection.date_3_name}
                                        onChange={e => setDate_3_value(e.target.value)}
                                        renderInput={(params) => <TextField fullWidth sx={{mb: 1}} {...params} />}
                                    />
                                </LocalizationProvider>}
                            {collection.boolean_1_enabled &&<FormControlLabel sx={{mb: 1}} control={<Checkbox id="standard-basic" type="checkbox" onChange={e => setBoolean_1_value(e.target.value)}/>} label={collection.boolean_1_name} fullWidth/>}
                            {collection.boolean_2_enabled &&<FormControlLabel sx={{mb: 1}} control={<Checkbox id="standard-basic" type="checkbox"  onChange={e => setBoolean_2_value(e.target.value)}/>} label={collection.boolean_2_name} fullWidth/>}
                            {collection.boolean_3_enabled &&<FormControlLabel control={<Checkbox id="standard-basic" type="checkbox" onChange={e => setBoolean_3_value(e.target.value)}/>} label={collection.boolean_3_name} fullWidth/>}
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
