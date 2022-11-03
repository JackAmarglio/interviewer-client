import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HeaderBar } from "../layout/HeaderBar";
import { useState } from "react";
import { connect } from "react-redux";
import { LogIn, Register, SendVerifyEmail } from "../../utils/auth";
import { toast } from 'react-toastify';
// import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

function VerifyStatus(props) {
    const { dispatch } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const history = useNavigate();
    const sendVerifyEmail = function (event) {
        setIsLoading(true);
        dispatch(SendVerifyEmail((status, message) => {
            setIsLoading(false);
            if (status == 1) {
                // toast("Already You verified email!",{                    
                //     type: "success"                    
                // });
                history('/SuccessScreen');
                window.location.reload();
            } else if (status == 2) {
                toast("Successfully email sent!", {
                    type: "success"
                });
                setIsEmailSent(true);
            } else if (status == 3) {
                toast("Error while send email!", {
                    type: "error"
                });
            } else if (status == 0) {
                toast("Error while send email on API!", {
                    type: "error"
                });
            }

        }));
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
                        <>We have sent you an email, please verify your email <br />  <Button onClick={sendVerifyEmail}>Resend Email</Button></>
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

const ConnectedVerifyStatus = connect(mapStateToProps)(VerifyStatus);

export { ConnectedVerifyStatus as VerifyStatus };
