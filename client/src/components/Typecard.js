import React from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material"
import { useHistory } from 'react-router-dom';
import { Navigate } from 'react-router';
const Typecard = (props) => {
    const history = useHistory();
    const setUserType = () => {
        if (props.type == 'interpreter') {
            history.push('/signup');
        }
        else {
            history.push('/signuporg');
        }
    }

    return (
        <Box sx={{ mx: "30px", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Button onClick={setUserType} sx={{ width: "200px", height: "70px", backgroundColor: "#00F000", color: "#FFFFFF", fontSize: "20px" }}>{props.type}</Button>
            <Box sx={{ width: "300px", height: "250px", mt: "20px", backgroundColor: "#F0F0F0", padding: "10px" }}>
                <Typography component="h3" sx={{ mb: "20px" }}>{props.title}</Typography>
                {props.content.map((item, index) => {
                    return <Typography key={index} component="h3">{item}</Typography>
                })}
            </Box>
        </Box>
    )
}

export default Typecard;
