import { HeaderBar } from "../layout/HeaderBar";
import { connect } from "react-redux";
import LandingLogo from "../../Images/mobileGuy.svg";
import { Grid, Typography, Box, styled, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "animate.css"
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import Welcome from "./Welcome"



function LandingPage(props) {
    const { loggedIn } = props;
    const [anim, setAnim] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        }, 3000);
    }, []);
    return (
        <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="2% 5%">
            {/* <HeaderBar /> */}
            {!anim &&
                <Box className="animate__animated animate__flipInY animate__delay-1s animate__zoomOutRight">
                    <img src="logo.png" alt="" />
                </Box>
            }
            {anim &&
                <Welcome />
            }
        </Box>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedLandingPage = connect(mapStateToProps)(LandingPage);

export { ConnectedLandingPage as LandingPage };
