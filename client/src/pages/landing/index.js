import { connect } from "react-redux";
import { Grid, Typography, Box, styled, Button } from "@mui/material";
import "animate.css"
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import Welcome from "./Welcome"



function LandingPage() {
    const [anim, setAnim] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        }, 3000);
    }, []);
    return (
        <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
            {!anim &&
                <Box className="animate__animated animate__flipInY animate__delay-1s animate__zoomOutRight" style={{alignItems: 'center', justifyContent:'center', display: 'flex', verticalAlign: 'middle'}}>
                    <img src="logo.png" alt="" className="logo" />
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
