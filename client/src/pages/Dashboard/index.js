import React, { useState, useEffect, useMemo, useReducer } from "react";
import axios from "axios";
import { API_URL } from "../../env";
import { getUserInfo } from "../../utils/auth";
import Box from "@mui/material/Box";
import { Typography, Grid, MenuItem, TextField, Select, Button, Switch } from "@mui/material";
import Location from "./Location"
import ScrollAnimation from 'react-animate-on-scroll';
import InputMask from "react-input-mask";
import { HeaderBar } from "../layout/HeaderBar";
import { toast } from "react-toastify";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { useHistory } from "react-router-dom"

const Dashboard = (props) => {
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: pink[600],
            '&:hover': {
                backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: pink[600],
        },
    }));
    const [year, setYear] = React.useState('');
    const [lang, setLang] = React.useState('');
    const [time, setTime] = React.useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [company, setCompany] = useState('')
    const [available, setAvailable] = useState(false)
    const [notavailable, setNotAvailable] = useState(false)
    const [schedule, setSchedule] = useState(false)
    const [availability, setAvailability] = useState()
    const history = useHistory()

    const handleChangeExperience = (event) => {
        setYear(event.target.value);
    };
    const handleChangeAvailable = (event) => {
        setAvailable(event.target.checked);
        if (event.target.value) {
            setNotAvailable(false)
            setSchedule(false)
        }
        setAvailability("available")
    };
    const handleChangeNotAvailable = (event) => {
        setNotAvailable(event.target.checked);
        if (event.target.value) {
            setAvailable(false)
            setSchedule(false)
        }
        setAvailability("notAvailable")
    };
    const handleChangeSchedule = (event) => {
        setSchedule(event.target.checked);
        if (event.target.value) {
            setNotAvailable(false)
            setAvailable(false)
        }
        setAvailability("schedule")
    };
    const handleChangeLang = (e) => {
        setLang(e.target.value)
    }
    const url = window.location.href
    console.log(url.lastIndexOf(), 'last index')
    const userId = url.substring(url.indexOf("dashboard") + 10, url.length);
    const [isClient, setIsClient] = useState('')
    const email = "d.kurtiedu@gmail.com"
    const [adminEmail, setAdminEmail] = useState()
    useEffect(() => {
        axios
            .get(`${API_URL}/auth/get`, {
                params: {
                    userId: userId
                },
            })
            .then((res) => {
                console.log(res.data.data, 'data')
                setIsClient(res.data.data)
                setAdminEmail(res.data.email)
            })
            .catch((err) => console.log(err))
    }, [])
    const options = [
        { label: "English", value: "English" },
        { label: "Chinese", value: "Chinese" },
        { label: "", value: "", disabled: true },
    ];
    const [selected, setSelected] = useState([]);

    const saveInterpreterInfo = () => {

        const state = {
            language: lang,
            experience: year,
            phoneNumber: phoneNumber,
            userId: userId,
            availableTime: availability
        }
        axios
            .post(`${API_URL}/auth/info`, state)
            .then((res) => {
                toast("Successfully updated", {
                    type: "success"
                });
            })
    }

    const saveClientInfo = () => {

        const state = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            userId: userId,
            company: company
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
        <>
            {adminEmail === email && <Box left="45%" display="flex" position="absolute" top="30%" flexDirection="column">
                <Button onClick={() => history.push("./clientinfo")}>Client Data</Button>
                <Button onClick={() => history.push("./interpreterinfo")}>Interpreter Data</Button>
            </Box>}
            {isClient === "Interpreter" && adminEmail !== email && <Box>
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
                            <Typography style={{ marginTop: '15px' }}>Availablity</Typography>
                            <Box marginLeft="80px">
                                <Box display="flex">
                                    <Switch
                                        checked={available}
                                        onChange={handleChangeAvailable}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography marginTop="7px">Available</Typography>
                                </Box>
                                <Box display="flex" marginTop="20px">
                                    <GreenSwitch
                                        checked={notavailable}
                                        onChange={handleChangeNotAvailable}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography marginTop="7px">Not Available</Typography>
                                </Box>
                                <Box display="flex" marginTop="20px">
                                    <Switch
                                        checked={schedule}
                                        onChange={handleChangeSchedule}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="warning"
                                    />
                                    <Typography marginTop="7px">Schedule</Typography>
                                </Box>
                            </Box>
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
            }
            {isClient === "client" && adminEmail !== email && <Box>
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
                            <Typography style={{ marginTop: '15px' }}>Company Name</Typography>
                            <TextField id="outlined-basic" label="company" variant="outlined" style={{ marginLeft: '50px', width: '200px' }} value={company} onChange={(e) => setCompany(e.target.value)} />
                        </Box>
                        <Box display="flex" marginTop="30px">
                            <Typography style={{ marginTop: '15px', marginLeft: '30px' }}>First Name</Typography>
                            <TextField
                                id="outlined-password-input"
                                label="First Name"
                                type="first name"
                                autoComplete="current-password"
                                value={firstName}
                                style={{ marginLeft: '55px', width: '200px', height: '30px' }}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Box>
                        <Box display="flex" marginTop="50px">
                            <Typography style={{ marginTop: '15px', marginLeft: '30px' }}>Last Name</Typography>
                            <TextField
                                id="outlined-password-input"
                                label="Last Name"
                                type="last name"
                                autoComplete="current-password"
                                value={lastName}
                                style={{ marginLeft: '55px', width: '200px', height: '30px' }}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Box>
                        <Box display="flex" marginTop="30px" marginLeft="30px">
                            <Location />
                        </Box>
                        <Box display="flex" margin="30px    0px 30px 30px">
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
                            <Button style={{ border: '1px solid blue', width: '100px', marginTop: '30px' }} onClick={() => saveClientInfo()}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            }
        </>
    )
}

export default Dashboard;