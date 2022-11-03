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
import { SendResetEmail } from "../../utils/auth";
// import LoadingIndicator from "../../components/LoadingIndicator";
import { toast } from 'react-toastify';
import * as isEmail from "is-email";
const theme = createTheme();

function ForgotPassword(props) {
    const { loggedIn, dispatch } = props;
    const [state, setState] = useState({
        email: "",
    });
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = function (event) {
        event.preventDefault();
        if (!isEmail(state.email)) {
            toast("Please input valid email!", {
                type: "warning"
            });
            return;
        }
        setIsLoading(true);
        dispatch(SendResetEmail(state, (err, message) => {
            if (!err) {
                toast("Successfully email sent!", {
                    type: "success"
                });
            } else {
                toast(message, {
                    type: "error"
                });
            }
            setIsLoading(false)
        }));
    };

    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };


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
                            Input Your Email For Reset
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3, width: '100%' }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label="User Email"
                                        type="email"
                                        id="email"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Email
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

const ConnectedForgotPassword = connect(mapStateToProps)(ForgotPassword);

export { ConnectedForgotPassword as ForgotPassword };
