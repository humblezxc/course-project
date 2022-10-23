import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import {FormGroup, FormLabel} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


Controller.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    render: PropTypes.func
};
export default function createCollection() {
    const [collectionName, setCollectionName] = useState('');
    const [teg, setTeg] = useState('');
    const [description, setDescription] = useState('');
    const [additionFields, setAdditionFields] = React.useState([
        { key: 'digit_1', enabled: false, value: ''},
        { key: 'digit_2', enabled: false, value: ''},
        { key: 'digit_3', enabled: false, value: ''},

        { key: 'string_1', enabled: false, value: '' },
        { key: 'string_2', enabled: false, value: '' },
        { key: 'string_3', enabled: false, value: '' },

        { key: 'text_1', enabled: false, value: '' },
        { key: 'text_2', enabled: false, value: '' },
        { key: 'text_3', enabled: false, value: '' },

        { key: 'boolean_1', enabled: false, value: ''},
        { key: 'boolean_2', enabled: false, value: '' },
        { key: 'boolean_3', enabled: false, value: '' },

        { key: 'date_1', enabled: false, value: '' },
        { key: 'date_2', enabled: false, value: '' },
        { key: 'date_3', enabled: false, value: '' },
    ]);
    const handleToggle = ({ target }) => {
        console.log(target)
        setAdditionFields(current =>
            current.map(obj => {
                if (obj.key === target.name) {
                    return {...obj, enabled: !obj.enabled};
                }

                return obj;
            }),
        );
    }
    const handleInput = ({ target }) => {
        console.log(additionFields.map(({ key, enabled, value})=> { return {[`${key}_value`]: value, [`${key}_enabled`]: enabled} } ))
        setAdditionFields(current =>
            current.map(obj => {
                if (obj.key === target.id) {
                    return {...obj, value: target.value};
                }

                return obj;
            }),
        );
    }


    const navigate = useNavigate();

    // const integerFields = ['digit_1', 'digit_2', 'digit_3'];
    // const stringFields = ['string_1', 'string_2', 'string_3'];
    // const textFields = ['text_1', 'text_2', 'text_3'];
    // const booleanFields = ['boolean_1', 'boolean_2', 'boolean_3'];
    // const dateFields = ['date_1', 'date_2', 'date_3'];

    const { control } = useForm({
        defaultValues: {
            fruits: []
        }
    });

    const AdditionLabels = [
        {
            label: <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="Column name"
                        autoFocus
                    />
                </Grid>
            </Grid>,
            value: ""
        }
    ];
    const createCollection = async (e) => {
        e.preventDefault();
        const params = {
            collectionName: collectionName,
            teg: teg,
            description: description
        }
        const object = additionFields.reduce(
            (obj, item) => Object.assign(obj, { [`${item.key}_value`]: item.value, [`${item.key}_enabled`]: item.enabled }), {});

        try {
            await axios.post("/collections", { ...params,
                ...object
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    New collection
                </Typography>
                <Box
                    component="form"
                    onSubmit={createCollection}
                    sx={{
                        mt: 3
                    }}
                    noValidate
                    autoComplete="off"
                >

                <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="collectionName" label="Collection name" variant="outlined" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="teg" label="Teg" variant="outlined" value={teg} onChange={(e) => setTeg(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                id="description"
                                aria-label="minimum height"
                                minRows={6}
                                placeholder="Description"
                                variant="outlined"
                                style={{ width: 400 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>

                        <Grid>
                            <h3>Integer fields</h3>
                            {additionFields.filter(field => field.key.includes('digit')).map(additionalField => (
                                <Grid item xs={12} sm={12}>
                                    <Checkbox {...additionalField}
                                              onChange={handleToggle}
                                              key={additionalField.key}
                                              name={additionalField.key}
                                              checked={additionalField.enabled}
                                    />
                                    <TextField id={additionalField.key} disabled={!additionalField.enabled} label="Collection name" variant="outlined" value={additionalField.value} onChange={handleInput}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid>
                            <h3>String fields</h3>
                            {additionFields.filter(field => field.key.includes('string')).map(additionalField => (
                                <Grid item xs={12} sm={12}>
                                    <Checkbox {...additionalField}
                                              onChange={handleToggle}
                                              key={additionalField.key}
                                              name={additionalField.key}
                                              checked={additionalField.enabled}
                                    />
                                    <TextField id={additionalField.key} disabled={!additionalField.enabled} label="Collection name" variant="outlined" value={additionalField.value} onChange={handleInput}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid>
                            <h3>Text fields</h3>
                            {additionFields.filter(field => field.key.includes('text')).map(additionalField => (
                                <Grid item xs={12} sm={12}>
                                    <Checkbox {...additionalField}
                                              onChange={handleToggle}
                                              key={additionalField.key}
                                              name={additionalField.key}
                                              checked={additionalField.enabled}
                                    />
                                    <TextField id={additionalField.key} disabled={!additionalField.enabled} label="Collection name" variant="outlined" value={additionalField.value} onChange={handleInput}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid>
                            <h3>Boolean fields</h3>
                            {additionFields.filter(field => field.key.includes('boolean')).map(additionalField => (
                                <Grid item xs={12} sm={12}>
                                    <Checkbox {...additionalField}
                                              onChange={handleToggle}
                                              key={additionalField.key}
                                              name={additionalField.key}
                                              checked={additionalField.enabled}
                                    />
                                    <TextField id={additionalField.key} disabled={!additionalField.enabled} label="Collection name" variant="outlined" value={additionalField.value} onChange={handleInput}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid>
                            <h3>Date fields</h3>
                            {additionFields.filter(field => field.key.includes('date')).map(additionalField => (
                                <Grid item xs={12} sm={12}>
                                    <Checkbox {...additionalField}
                                              onChange={handleToggle}
                                              key={additionalField.key}
                                              name={additionalField.key}
                                              checked={additionalField.enabled}
                                    />
                                    <TextField id={additionalField.key} disabled={!additionalField.enabled} label="Collection name" variant="outlined" value={additionalField.value} onChange={handleInput}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
