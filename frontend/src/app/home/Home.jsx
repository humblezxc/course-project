import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Collections = ['fasd', 'fasd', 'fasd', 'fasd', 'fasd']
export default function Home() {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="xl">
                        {/*<Typography*/}
                        {/*    component="h1"*/}
                        {/*    variant="h2"*/}
                        {/*    align="center"*/}
                        {/*    color="text.primary"*/}
                        {/*    gutterBottom*/}
                        {/*>*/}
                        {/*    Home*/}
                        {/*</Typography>*/}
                        {/*<Container maxWidth="sm">*/}
                        {/*    <Typography variant="h5" align="center" color="text.secondary" paragraph>*/}
                        {/*        Something short and leading about the collection below—its contents,*/}
                        {/*        the creator, etc. Make it short and sweet, but not too short so folks*/}
                        {/*        don&apos;t simply skip over it entirely.*/}
                        {/*    </Typography>*/}
                        {/*    <Stack*/}
                        {/*        sx={{ pt: 4 }}*/}
                        {/*        direction="row"*/}
                        {/*        spacing={2}*/}
                        {/*        justifyContent="center"*/}
                        {/*    >*/}
                        {/*        <Button variant="contained">Main call to action</Button>*/}
                        {/*        <Button variant="outlined">Secondary action</Button>*/}
                        {/*    </Stack>*/}
                        {/*</Container>*/}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    align='center'
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Last added items
                                </Typography>
                                <Grid>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="CollectionName Collection Username ndgfhfghd fghj  jgfh ghjjj h gfhjf fghdfghdfghdfghiop"
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    align='center'
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Top 5 the biggest Collections
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Number</TableCell>
                                                <TableCell>CollectionName</TableCell>
                                                <TableCell align="right">Descriptions</TableCell>
                                                <TableCell align="right">Tags</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Collections.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Number
                                                    </TableCell>
                                                    <TableCell align="right">CollectionName</TableCell>
                                                    <TableCell align="right">Descriptions</TableCell>
                                                    <TableCell align="right">Tags</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    align='center'
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Tags cloud
                                </Typography>

                                <Stack direction="row" maxWidth="400px" spacing={1}>
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" variant="outlined" onClick={handleClick} />
                                </Stack>
                                <Stack direction="row" maxWidth="400px" spacing={1}>
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" variant="outlined" onClick={handleClick} />
                                </Stack>
                                <Stack direction="row" maxWidth="400px" spacing={1}>
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" onClick={handleClick} />
                                    <Chip label="Clickable" variant="outlined" onClick={handleClick} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    {/*<Grid container spacing={4}>*/}
                    {/*    {cards.map((card) => (*/}
                    {/*        <Grid item key={card} xs={12} sm={6} md={4}>*/}
                    {/*            <Card*/}
                    {/*                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}*/}
                    {/*            >*/}
                    {/*                <CardMedia*/}
                    {/*                    component="img"*/}
                    {/*                    sx={{*/}
                    {/*                        // 16:9*/}
                    {/*                        pt: '56.25%',*/}
                    {/*                    }}*/}
                    {/*                    image="https://source.unsplash.com/random"*/}
                    {/*                    alt="random"*/}
                    {/*                />*/}
                    {/*                <CardContent sx={{ flexGrow: 1 }}>*/}
                    {/*                    <Typography gutterBottom variant="h5" component="h2">*/}
                    {/*                        Heading*/}
                    {/*                    </Typography>*/}
                    {/*                    <Typography>*/}
                    {/*                        This is a media card. You can use this section to describe the*/}
                    {/*                        content.*/}
                    {/*                    </Typography>*/}
                    {/*                </CardContent>*/}
                    {/*                <CardActions>*/}
                    {/*                    <Button size="small">View</Button>*/}
                    {/*                    <Button size="small">Edit</Button>*/}
                    {/*                </CardActions>*/}
                    {/*            </Card>*/}
                    {/*        </Grid>*/}
                    {/*    ))}*/}
                    {/*</Grid>*/}
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
