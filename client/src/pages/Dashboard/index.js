import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../env";
import Box from "@mui/material/Box";
import { Typography, Select, Grid, MenuItem, TextField } from "@mui/material";
import countryList from 'react-select-country-list'
const Dashboard = (props) => {
    const { loggedIn, dispatch } = props;
    const [year, setYear] = React.useState('');
    const [lang, setLang] = React.useState('');
    const [time, setTime] = React.useState('');
    const handleChangeExperience = (event) => {
        setYear(event.target.value);
    };
    const handleChangeLang = (e) => {
        setLang(e.target.value)
    }
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const changeHandler = value => {
        setValue(value)
    }

    return (
        <Box padding="80px" display="flex">
            <Grid item xs={6}>
                <img src="logo.png" alt="logoImage" width="100%" height="350px" />
            </Grid>
            <Grid item xs={6} marginLeft="50px">
                <Box display="flex">
                    <Typography>Languages</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lang}
                        label="Language"
                        onChange={handleChangeLang}
                        style={{ height: '40px', width: '200px', marginLeft: '50px' }}
                    >
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>Two</MenuItem>
                        <MenuItem value={3}>Three</MenuItem>
                        <MenuItem value={4}>Four</MenuItem>
                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={6}>Over Five</MenuItem>
                    </Select>
                </Box>
                <Box display="flex" marginTop="30px">
                    <Typography>Experience</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Year"
                        onChange={handleChangeExperience}
                        style={{ height: '40px', width: '200px', marginLeft: '50px' }}
                    >
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>Two</MenuItem>
                        <MenuItem value={3}>Three</MenuItem>
                        <MenuItem value={4}>Four</MenuItem>
                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={6}>Over Five</MenuItem>
                    </Select>
                </Box>
                <Box display="flex" marginTop="30px">
                    <Typography>Available Time</Typography>
                    <TextField
                        id="outlined-password-input"
                        label="Available Time"
                        type="available time"
                        autoComplete="current-password"
                        value={time}
                        style={{ marginLeft: '25px', width: '200px', height: '40px' }}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </Box>
                <Box display="flex" marginTop="30px">
                    <Typography>Location</Typography>
                    <Select options={options} value={value} onChange={changeHandler} />
                </Box>
            </Grid>
        </Box>
    )
}

export default Dashboard;