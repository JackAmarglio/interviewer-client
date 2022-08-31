import React, { useState, useEffect, useMemo, useReducer } from "react";
import axios from "axios";
import { API_URL } from "../../env";
import { getUserInfo } from "../../utils/auth";
import Box from "@mui/material/Box";
import { Typography, Grid, MenuItem, TextField, Select, Button } from "@mui/material";
import Location from "./Location"
import ScrollAnimation from 'react-animate-on-scroll';
import InputMask from "react-input-mask";
import { HeaderBar } from "../layout/HeaderBar";
import { toast } from "react-toastify";

const Dashboard = (props) => {
    const { loggedIn, dispatch } = props;
    const [year, setYear] = React.useState('');
    const [lang, setLang] = React.useState('');
    const [time, setTime] = React.useState('');
    const [phoneNumber, setPhoneNumber] = useState()
    const handleChangeExperience = (event) => {
        setYear(event.target.value);
    };
    const handleChangeLang = (e) => {
        setLang(e.target.value)
    }
    const options = [
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
        { label: "", value: "", disabled: true },
    ];
    const [selected, setSelected] = useState([]);

    const saveInterpreterInfo = () => {
        const url = window.location.href
        console.log(url.lastIndexOf(), 'last index')
        const userId = url.substring(url.indexOf("dashboard") + 10, url.length)
        const state = {
            language: lang,
            experience: year,
            phoneNumber: phoneNumber,
            userId: userId,
            availableTime: time
        }
        axios
            .post(`${API_URL}/auth/info`, state)
            .then((res) => {
                toast("Successfully updated", {
                    type: "success"
                });
            })
    }

    return (
        <Box>
            <HeaderBar />
            <Box padding="80px" display="flex">
                <Grid item xs={6}>
                    <ScrollAnimation animateOnce={true} animateIn="animate__animated animate__fadeInRight">
                        <img src="logo.png" width="100%" height="350px" alt="logoImage" />
                    </ScrollAnimation>
                </Grid>
                <Grid item xs={6} container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <Box display="flex">
                        <Typography style={{ marginTop: '15px' }}>Languages</Typography>
                        <TextField id="outlined-basic" label="lang" variant="outlined" style={{ marginLeft: '50px', width: '200px' }} value={lang} onChange={(e) => setLang(e.target.value)} />
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
                        <Typography style={{ marginTop: '15px' }}>Available Time</Typography>
                        <TextField
                            id="outlined-password-input"
                            label="Available Time"
                            type="available time"
                            autoComplete="current-password"
                            value={time}
                            style={{ marginLeft: '25px', width: '200px', height: '30px' }}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" marginTop="30px">
                        <Location />
                    </Box>
                    <Box display="flex" marginTop="30px">
                        <Typography style={{ marginTop: '5px' }}>Phone number</Typography>
                        <InputMask
                            value={phoneNumber}
                            placeholder="Enter Mobile Number"
                            onChange={(e) =>
                                setPhoneNumber(
                                    String(e.target.value).replace(/[^0-9]/g, "")
                                )
                            }
                            mask="(999) 999-9999"
                            className="phone_number"
                            style={{ paddingLeft: '5px' }}
                        />
                    </Box>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button style={{ border: '1px solid blue', width: '100px', marginTop: '30px' }} onClick={() => saveInterpreterInfo()}>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard;