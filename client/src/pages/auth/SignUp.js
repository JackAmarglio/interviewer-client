
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { createRef, useEffect, useState } from "react";
import { HeaderBar } from "../layout/HeaderBar";
import { Register } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import * as isEmail from "is-email";
import { toast } from 'react-toastify';
// import LoadingIndicator from "../../components/LoadingIndicator";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from '../../env';
const theme = createTheme();

function SignUp(props) {
    const { loggedIn, dispatch } = props;
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        agreeTerms: false,
        g_captcha_response: "",
        phoneNumber: "",
        location: "",
        availableTime: "",
        experience: "",
        language: ""
    });
    const recaptchaRef = createRef();
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false);
    const { firstName, lastName, email, password, confirmpassword, language, experience, availableTime, location, phoneNumber } = state;
    const handleSubmit = function (event) {
        event.preventDefault();
        if (!isEmail(state.email)) {
            toast("Please Input Correct Email!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.firstName) {
            toast("Please Input First Name!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        if (!state.lastName) {
            toast("Please Input Last Name!", {
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
        if (!state.agreeTerms) {
            toast("Please select agree terms!", {
                type: "warning",
                progress: undefined
            });
            return;
        }
        setIsLoading(true);
        dispatch(Register({ ...state, isInterpreter: true }, (error) => {
            if (error) {
                setIsLoading(false);
                toast(error, {
                    type: "error",
                    progress: undefined
                });
                return;
            }
        }));
        history.push("/signin")
    };
    const agreedTerms = function () {
        setState({ ...state, agreeTerms: !state.agreeTerms });
    }
    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };
    const onChange = function (value) {
        setState({ ...state, g_captcha_response: value });
    }
    const onExpired = function () {
        setState({ ...state, g_captcha_response: "" });
    }
    return (
        <ThemeProvider theme={theme}>
            {/* {isLoading && <LoadingIndicator />} */}
            <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="2% 5%">
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
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up as interpreter
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>
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
                                        label="ConfirmPassword"
                                        type="password"
                                        id="confirmpassword"
                                        value={confirmpassword}
                                        onChange={handleChange}
                                        autoComplete="confirmpassword"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.agreeTerms}
                                                name="agreeTerms"
                                                onChange={agreedTerms}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                color="primary"
                                            />
                                        }
                                        label="I have read and agree to the Privacy Policy"
                                    />
                                </Grid>
                            </Grid>
                            <ReCAPTCHA
                                sitekey={SITE_KEY}
                                size="normal"
                                onChange={onChange}
                                onExpired={onExpired}
                                ref={recaptchaRef}
                                className="recaptcha-container"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
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

const ConnectedSignUp = connect(mapStateToProps)(SignUp);

export { ConnectedSignUp as SignUp };
