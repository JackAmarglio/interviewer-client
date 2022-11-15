import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../env";
import Box from "@mui/material/Box";
import { Typography, Grid, MenuItem, TextField, Select, Button, Switch } from "@mui/material";
import Location from "./Location"
import ScrollAnimation from 'react-animate-on-scroll';
import InputMask from "react-input-mask";
import { HeaderBar } from "../layout/HeaderBar";
import { toast } from "react-toastify";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { useNavigate } from "react-router-dom"
import countryList from 'react-select-country-list'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../../Images/logo.png"

const Dashboard = () => {
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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [company, setCompany] = useState('')
    const [available, setAvailable] = useState(false)
    const [notavailable, setNotAvailable] = useState(false)
    const [schedule, setSchedule] = useState(false)
    const [availability, setAvailability] = useState()
    const history = useNavigate()
    const url = window.location.href
    const userId = url.substring(url.indexOf("dashboard") + 11, url.length);
    const [isClient, setIsClient] = useState('')
    const email = "d.kurtiedu@gmail.com"
    const [adminEmail, setAdminEmail] = useState()
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const [time, setTime] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const year1 = startDate.getFullYear()
    const month1 = startDate.getMonth() + 1
    const day1 = startDate.getDate()
    const year2 = endDate.getFullYear()
    const month2 = endDate.getMonth() + 1
    const day2 = endDate.getDate()
    const navigate = useNavigate()

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
        setAvailability("-")
    };
    const handleChangeSchedule = (event) => {
        setSchedule(event.target.checked);
        if (event.target.value) {
            setNotAvailable(false)
            setAvailable(false)
        }
        setAvailability("schedule")
    };

    
    const changeHandler = value => {
        setValue(value)
    }
    useEffect(() => {
        axios
            .get(`${API_URL}/auth/get`, {
                params: {
                    userId: userId,
                },
            })
            .then((res) => {
                console.log(res.data.user, 'user')
                setIsClient(res.data.data)
                setAdminEmail(res.data.email)
                setTime(res.data.time)
                const total_time = res.data.user
                let b = 0
                total_time.date.map((item, index) => {
                    const a1 = new Date(item.year, item.month - 1 , item.day);
                    const a2 = new Date(year1, month1 - 1, day1);
                    const a3 = new Date(year2, month2 - 1, day2);
                    if (a1 >= a2 && a1 <= a3) {
                        b += item.worktime
                    }
                })
                setTime(b)
            })
            .catch((err) => console.log(err))
    }, [startDate, endDate])

    const saveInterpreterInfo = () => {

        const state = {
            language: lang,
            experience: year,
            phoneNumber: phoneNumber,
            userId: userId,
            location: value,
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
            company: company,
            location: value
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
                <Button onClick={() => history("/clientinfo")}>Client Data</Button>
                <Button onClick={() => history("/interpreterinfo")}>Interpreter Data</Button>
            </Box>}
            
            {isClient === "Interpreter" && adminEmail !== email && <Box backgroundColor="black" color="white" >
                <HeaderBar />
                {/* <Box display="flex">
                    <DatePicker className="form-control1" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    <DatePicker className="form-control2" selected={endDate} onChange={(date: Date) => setEndDate(date)} />
                </Box> */}
                <Box padding="80px" display="flex">
                    <Grid item xs={6}>
                        <ScrollAnimation animateOnce={true} animateIn="animate__animated animate__fadeInRight">
                            <img src={Logo} width="100%" height="350px" alt="logoImage" />
                        </ScrollAnimation>
                    </Grid>
                    
                    <Grid item xs={6} container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Box display="flex">
                            <Typography style={{ marginTop: '15px' }}>Languages</Typography>
                            <TextField id="outlined-basic" label="lang" variant="outlined" style={{ marginLeft: '50px', width: '200px', background: 'white' }} value={lang} onChange={(e) => setLang(e.target.value)} />
                        </Box>
                        <Box display="flex" marginTop="30px">
                            <Typography>Experience</Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Year"
                                onChange={handleChangeExperience}
                                style={{ height: '40px', width: '200px', marginLeft: '50px', background: 'white' }}
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
                            <Location value={value} options={options} changeHandler={changeHandler} />
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
                        <Box display="flex" margin="30px 0px 30px 30px">
                            {/* <Typography style={{ marginTop: '5px' }}>Work Time</Typography>
                            <TextField
                                value={time}
                                style={{ marginLeft: '55px', width: '200px', height: '30px' }}
                            /> */}
                            <Button style={{ border: '1px solid white', padding: '10px', background: 'white', color: 'black' }} onClick={() => {navigate(`/interpreterinfo/:${userId}`)}}>Work Time</Button>
                        </Box>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button style={{ border: '1px solid white', width: '100px', marginTop: '30px', background: 'white', color: 'black' }} onClick={() => saveInterpreterInfo()}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            }
            {isClient === "client" && adminEmail !== email && <Box backgroundColor="black" color="white" >
                <HeaderBar />
                <Box padding="80px" display="flex">
                    <Grid item xs={6}>
                        <ScrollAnimation animateOnce={true} animateIn="animate__animated animate__fadeInRight">
                            <img src={Logo} width="100%" height="350px" alt="logoImage" />
                        </ScrollAnimation>
                    </Grid>
                    <Grid item xs={6} container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Box display="flex">
                            <Typography style={{ marginTop: '15px' }}>Company Name</Typography>
                            <TextField id="outlined-basic" label="company" variant="outlined" style={{ marginLeft: '50px', width: '200px', background: 'white' }} value={company} onChange={(e) => setCompany(e.target.value)} />
                        </Box>
                        <Box display="flex" marginTop="30px">
                            <Typography style={{ marginTop: '15px', marginLeft: '30px' }}>First Name</Typography>
                            <TextField
                                id="outlined-password-input"
                                label="First Name"
                                type="first name"
                                autoComplete="current-password"
                                value={firstName}
                                style={{ marginLeft: '55px', width: '200px', height: '50px', background: 'white' }}
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
                                style={{ marginLeft: '55px', width: '200px', height: '50px', background: 'white' }}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Box>
                        <Box display="flex" marginTop="30px" marginLeft="30px">
                            <Location value={value} options={options} changeHandler={changeHandler} />
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
                            <Button style={{ border: '1px solid blue', width: '100px', marginTop: '30px', background: 'white', color: 'black' }} onClick={() => saveClientInfo()}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            }
        </>
    )
}

export default Dashboard;