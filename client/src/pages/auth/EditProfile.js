/*
additional data:  about, address, website, contact
*/

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { HeaderBar } from "../layout/HeaderBar";
import { getUserInfo, updateUserInfo } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import Usertype from "../usertype";
// import LoadingIndicator from "../../components/LoadingIndicator";
import { toast } from "react-toastify";
import * as isEmail from "is-email";
const theme = createTheme();

function EditProfile(props) {
    const { loggedIn, dispatch } = props;
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyInfo: "",
        address: "",
        website: "",
        contact: "",
        isUser: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = function (event) {
        event.preventDefault();
        setIsLoading(true);

        if (!isEmail(state.email)) {
            toast("Please Input Correct Email!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (state.password != state.confirmpassword) {
            toast("Password mismatch!", {
                type: "warning"
            });
            return;
        }
        if (!state.firstName) {
            toast(state.isUser ? "Please Input First Name" : "Please Input Organisation represtant!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (state.isUser && !state.lastName) {
            toast("Please Input Last Name!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.isUser && !state.companyInfo) {
            toast("Please Input Organisation Name!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        // if(state.website && !isEmail(state.website)){
        //     toast("Please Input Correct Website Email!",{
        //         type: "warning",
        //         progress: undefined
        //     });
        //     return;
        // }

        if (!state.isUser && !state.contact) {
            toast("Please Input Contact Email", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.isUser && !isEmail(state.contact)) {
            toast("Please Input Correct Format about Contact Email", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.isUser && !state.address) {
            toast("Please Input Organization Address", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.password) {
            toast("Please Input Password!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (state.password != state.confirmpassword) {
            toast("Password mismatch!", {
                type: "warning"
            });
            return;
        }

        dispatch(updateUserInfo({ ...state }, (err) => {
            setIsLoading(false);

            if (err) {
                toast(err, {
                    type: "error"
                });
                return;
            }
            toast("Successfully updated", {
                type: "success"
            });
            return;
        }));
    };

    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        dispatch(getUserInfo((userInfo) => {
            setState({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                password: "",
                companyInfo: userInfo.companyInfo,
                address: userInfo.address,
                website: userInfo.website,
                contact: userInfo.contact,
                isUser: userInfo.isUser
            });
        }));

    }, [])

    const { firstName, lastName, email, password, confirmpassword, companyInfo, address, website, contact } = state;
    return (
        <ThemeProvider theme={theme}>
            {/* {isLoading && <LoadingIndicator />} */}
            <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="1% 3%">
                <HeaderBar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Profile
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={state.isUser ? 6 : 12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label={state.isUser ? "First Name" : "Organisation representant"}
                                        value={firstName}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </Grid>
                                {state.isUser && (<Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleChange}
                                        autoComplete="family-name"
                                    />
                                </Grid>)}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmpassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        value={confirmpassword}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {!state.isUser && (
                                    <>
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                fullWidth
                                                id="companyInfo"
                                                label="Organisation Name"
                                                name="companyInfo"
                                                value={companyInfo}
                                                onChange={handleChange}
                                                autoComplete="companyInfo"
                                                placeholder="ex:IT, Bank, Medical..."
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="address"
                                                label="Organisation Adress"
                                                name="address"
                                                value={address}
                                                onChange={handleChange}
                                                autoComplete="address"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="website"
                                                label="Website"
                                                name="website"
                                                value={website}
                                                onChange={handleChange}
                                                autoComplete="website"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                fullWidth
                                                id="contact"
                                                label="Contact Email"
                                                name="contact"
                                                value={contact}
                                                onChange={handleChange}
                                                autoComplete="contact"
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedEditProfile = connect(mapStateToProps)(EditProfile);

export { ConnectedEditProfile as EditProfile };
