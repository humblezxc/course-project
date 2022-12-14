import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function CreateCollection() {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [name, setName] = useState('');

    const axiosJWT = axios.create();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('/api/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                console.log(error)
            }
        }
    }

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('/api/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const [collectionName, setCollectionName] = useState('');
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

    const createCollection = async (e) => {
        e.preventDefault();
        const params = {
            collectionName: collectionName,
            description: description
        }
        const object = additionFields.reduce(
            (obj, item) => Object.assign(obj, { [`${item.key}_name`]: item.value, [`${item.key}_enabled`]: item.enabled }), {});

        try {
            await axiosJWT.post("/api/collections", { ...params,
                ...object
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/collections");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }
    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
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

                        <Grid paddingBottom={2}>
                            <TextField id="collectionName" fullWidth label="Collection name" variant="outlined" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}/>
                        </Grid>

                        {/*<Grid>*/}
                        {/*    <TextField id="teg" label="Teg" variant="outlined" value={teg} onChange={(e) => setTeg(e.target.value)}/>*/}
                        {/*</Grid>*/}

                    <Grid>
                            <TextareaAutosize
                                id="description"
                                aria-label="minimum height"
                                minRows={6}
                                placeholder="Description"
                                variant="outlined"
                                style={{ width: 555 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h3>Integer fields</h3>
                            {additionFields.filter(field => field.key.includes('digit')).map(additionalField => (
                                    <Grid paddingBottom={2}>
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
                        <Grid item xs={12} sm={6}>
                        <h3>String fields</h3>
                            {additionFields.filter(field => field.key.includes('string')).map(additionalField => (
                                <Grid paddingBottom={2}>
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
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h3>Text fields</h3>
                            {additionFields.filter(field => field.key.includes('text')).map(additionalField => (
                                <Grid paddingBottom={2}>
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
                        <Grid item xs={12} sm={6}>
                            <h3>Boolean fields</h3>
                            {additionFields.filter(field => field.key.includes('boolean')).map(additionalField => (
                                <Grid paddingBottom={2}>
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
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h3>Date fields</h3>
                            {additionFields.filter(field => field.key.includes('date')).map(additionalField => (
                                <Grid paddingBottom={2}>
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
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 3 }}
                                >
                                    Create
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
