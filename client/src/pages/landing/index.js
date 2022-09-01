import { HeaderBar } from "../layout/HeaderBar";
import { connect } from "react-redux";
import LandingLogo from "../../Images/mobileGuy.svg";
import { Grid, Typography, Box, styled, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShowText = styled("div")(({ theme }) => ({
    margin: "3% 0",
    [theme.breakpoints.down("md")]: {
        textAlign: "center"
    },
    [theme.breakpoints.up("lg")]: {
        textAlign: "left"
    }
}));


function LandingPage(props) {
    const { loggedIn } = props;
    return (
        <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="2% 5%">
            <HeaderBar />
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <ShowText>
                        <Typography variant="h3">
                            Interpreter-Client site
                        </Typography>
                        <Typography variant="h6">
                            Clients can use this site to get proper interpreter and interpreters can use this to get jobs.
                            We provide a good opportunity for clients and interpreters.
                        </Typography>
                    </ShowText>
                </Grid>
                <Grid item md={5} margin="5% auto" maxHeight={240}>
                    <img
                        src={LandingLogo}
                        alt="Mobile Guy"
                        id="landingImg"
                    ></img>
                </Grid>
                <Grid item margin="auto" textAlign="center">
                    <Typography variant="h6">
                        New to this site?
                        <br />
                        <Button
                            href="/usertype"
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>

                    </Typography>
                    <Typography variant="h6">
                        Already a member?
                        <br />
                        <Button
                            href="/signin"
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </Typography>

                </Grid>

            </Grid>
        </Box>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedLandingPage = connect(mapStateToProps)(LandingPage);

export { ConnectedLandingPage as LandingPage };
