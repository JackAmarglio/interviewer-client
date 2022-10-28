import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HeaderBar } from "../layout/HeaderBar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { VerifyEmail as verifyEmail } from "../../utils/auth";
// import LoadingIndicator from "../../components/LoadingIndicator";
import { toast } from 'react-toastify';
import { Typography } from "@mui/material";
const theme = createTheme();
function VerifyEmail(props) {
    const { dispatch } = props;
    const history = useHistory();
    const [hasError, setHasError] = useState(true);
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        dispatch(verifyEmail(window.location.search, (err, message) => {
            setIsLoading(false);
            if (!err) {
                // toast("Successfully Verified!",{
                //     type: "success",
                //     progress: undefined
                // });
                // history.push('/dashboard');
                setHasError(false);
                setVerified(true);
                return;
            } else {
                toast(message, {
                    type: "Error",
                    progress: undefined
                });
                setHasError(true);
                return;
            }

        }));

    }, []);
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

                        {!verified && !hasError && (<Typography>Verifying ...</Typography>)}
                        {!verified && hasError && (<Typography className="text-red">Oops! Email Verification Failed!</Typography>)}
                        {verified && (<div>Verification Successed. <a href="/dashboard">Go to dashboard</a></div>)}
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function mapStateToProps(state, props) {
    const { loggedIn, emailConfirmed } = state;
    return { loggedIn: loggedIn, emailConfirmed: emailConfirmed };

}

const ConnectedVerifyEmail = connect(mapStateToProps)(VerifyEmail);

export { ConnectedVerifyEmail as VerifyEmail };
