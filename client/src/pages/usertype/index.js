import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Typecard from "../../components/Typecard";

const Usertype = () => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography component="h2" sx={{ mt: "50px", color: "#00D000", fontSize: "30px" }}>REGISTER AS...</Typography>
            <Box sx={{ display: "flex", mt: "50px" }}>
                <Typecard key="interpreter" type="interpreter" title="Data for interpreters" content={["user name", "phone number", "languages", "location", "available time", 'availability']} />
                <Typecard key="client" type="client" title="Data for client" content={["Create advanced events", "Organisation page", "Manager account", "Subscription features (offer deals, multiple even tags, create multiple events at one time and more)"]} />
            </Box>
        </Box>
    )
}

export default Usertype;
