/*
additional data:  about, address, website, contact
*/

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
import { createRef, useState } from "react";
import { HeaderBar } from "../layout/HeaderBar";
import { RegisterAsClient } from "../../utils/auth";
import { toast } from 'react-toastify';
// import LoadingIndicator from "../../components/LoadingIndicator";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from '../../env';
import * as isEmail from "is-email";

const theme = createTheme();

function SignUpOrg(props) {
    const { loggedIn, dispatch } = props;
    const recaptchaRef = createRef();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyInfo: "",
        address: "",
        website: "",
        contact: "",
        agreeTerms: false,
        g_captcha_response: ""
    });
    const { firstName, email, password, confirmpassword, companyInfo, address, website, contact } = state;
    const history = useHistory()

    const handleSubmit = function (event) {
        event.preventDefault();

        if (!isEmail(state.email)) {
            toast("Please Input Correct Email!", {
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
        if (!state.g_captcha_response) {
            toast("Please check what your are not robot!", {
                type: "warning",
                progress: undefined
            });
            console.log(recaptchaRef)
            return;
        }
        setIsLoading(true);
        dispatch(RegisterAsClient({ ...state }, (error) => {
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
        console.log(state)
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
                            Sign up as client
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={1}>
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
                            <Button
                            >
                                delete user
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

const ConnectedSignUpOrg = connect(mapStateToProps)(SignUpOrg);

export { ConnectedSignUpOrg as SignUpOrg };
