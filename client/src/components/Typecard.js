import React from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
const Typecard = (props) => {
    const history = useNavigate();
    const setUserType = () => {
        if (props.type == 'interpreter') {
            history('/signup');
        }
        else {
            history('/signuporg');
        }
    }

    return (
        <Box sx={{ mx: "30px", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Button onClick={setUserType} sx={{ width: "200px", height: "70px", backgroundColor: "#00F000", color: "#FFFFFF", fontSize: "20px", marginTop: '30px' }}>{props.type}</Button>
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
