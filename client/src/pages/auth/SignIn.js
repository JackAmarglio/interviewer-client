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
import { HeaderBar } from "../layout/HeaderBar";
import { useState } from "react";
import { connect } from "react-redux";
import { LogIn } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { forgotPas } from "./ForgotPassword";
import { toast } from 'react-toastify';
import { API_URL } from "../../env";
import axios from "axios";
const theme = createTheme();

function SignIn(props) {
    const { dispatch } = props;
    const history = useHistory();
    const [state, setState] = useState({
        password: "",
        email: ""
    });
    const { password, email } = state;
    const handleSubmit = function (event) {
        event.preventDefault();
        axios
            .post(`${API_URL}/auth/login`, state)
            .then((res) => {
                history.push("/dashboard:" + res.data.id)
            })
    };
    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };



    return (
        <ThemeProvider theme={theme}>
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
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                value={email}
                                onChange={handleChange}
                                id="email"
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={handleChange}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgotpassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
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
    const { loggedIn, emailConfirmed } = state;
    return { loggedIn: loggedIn, emailConfirmed: emailConfirmed };
}

const ConnectedSignIn = connect(mapStateToProps)(SignIn);

export { ConnectedSignIn as SignIn };
