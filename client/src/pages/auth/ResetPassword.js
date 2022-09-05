import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { HeaderBar } from "../layout/HeaderBar";
import { ResetPassword as resetPassword } from "../../utils/auth";
import { useHistory } from "react-router-dom";
// import LoadingIndicator from "../../components/LoadingIndicator";

import { toast } from 'react-toastify';
import { JWT_SECRET } from "../../env";
import jwtDecode from "jwt-decode";

const theme = createTheme();
function ResetPassword(props) {
    const { loggedIn, dispatch } = props;
    const history = useHistory();
    const [state, setState] = useState({
        newpassword: "",
        confirmpassword: "",
        email: "",
        token: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { newpassword, confirmpassword } = state;

    const handleSubmit = function (event) {
        event.preventDefault();

        if (!state.newpassword || !state.confirmpassword) {
            toast("Please input password!", {
                type: "warning"
            });
            return;
        }
        if (state.newpassword != state.confirmpassword) {
            toast("Password mismatch!", {
                type: "warning"
            });
            return;
        }
        setIsLoading(true);
        dispatch(resetPassword({ ...state }, (err, message) => {
            setIsLoading(false);
            if (!err) {
                toast("Successfully password reset", {
                    type: "success"
                });
                history.push("/dashboard");
                return;
            } else {
                toast(message, {
                    type: "error"
                });
                return;
            }
        }));
    }



    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        var token = window.location.search.slice(7);
        let userData = jwtDecode(token, JWT_SECRET);
        setState({ ...state, email: userData.email, token: token });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* {isLoading && <LoadingIndicator />} */}
            <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="2% 5%">
                {/* <HeaderBar /> */}
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
                            Reset Password
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label="Your Email"
                                        type="email"
                                        id="email"
                                        value={state.email}
                                        disabled />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="newpassword"
                                        label="New Password"
                                        type="password"
                                        id="newpassword"
                                        value={state.newpassword}
                                        onChange={handleChange}
                                        autoComplete="new password"
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
                                        value={state.confirmpassword}
                                        onChange={handleChange}
                                        autoComplete="confirmpassword"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
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

const ConnectedResetPassword = connect(mapStateToProps)(ResetPassword);


export { ConnectedResetPassword as ResetPassword };
