import React from "react";
import { Grid, Typography, Box, styled, Button } from "@mui/material";
import LandingLogo from "../../Images/mobileGuy.svg";
import ScrollAnimation from 'react-animate-on-scroll';

const Welcome = () => {
  const ShowText = styled("div")(({ theme }) => ({
    margin: "3% 0",
    [theme.breakpoints.down("md")]: {
      textAlign: "center"
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "left"
    }
  }));
  return (
    <Box style={{ background: "black", padding: '20px' }}>
      <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
        <Grid container spacing={4}>
          <Box display="flex">
            <video width="300" height="200" autoPlay muted loop style={{ marginTop: '50px', marginLeft: '30px' }}>
              <source src="/1.webm" type="video/webm"/>
            </video>
            <ScrollAnimation animateOnce={false} animateIn="animate__animated animate__fadeInLeft">
              <img src="logo.png" alt="" width="400px" style={{ marginTop: "40px" }} />
            </ScrollAnimation>
            <ScrollAnimation animateOnce={false} animateIn="animate__animated animate__fadeInRight">
              <Typography marginTop="30px" marginLeft="30px" color="white">
                <Typography color="white" fontSize="25px" paddingTop="30px" fontStyle="bold">Neon-Languages LLC</Typography><br />

                A company built  based on the needs of the costumer. Neon-L brings a new era, a place of innovative experience, with the ability to make choices that matter. With the efficiency and the collaboration of our team you have the ability to create a fast paced telephonic interpretation session for you.

                Our company has worked hard to create a conclusive system that gives the right to our costumers to become our clients or use our services without commitment.

                We serve clients and guests similarly, with the need to create a faster and more advanced system of communication.

                Neon-L was founded in Connecticut, USA, and its looking to rise above the limitations of other traditional language service companies, giving the flexibility to place an OPI call on your own time and based on your needs.
                </Typography>
            </ScrollAnimation>
          </Box>
        </Grid>
        <Box marginTop="70px" margin="2% 5%">
          <Grid container spacing={4}>
            <Grid item md={7}>
              <ShowText>
                <Typography variant="h3" color="white">
                  Interpreter-Client site
                </Typography>
                <Typography variant="h6" color="white">
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
              <Typography variant="h6" color="white">
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
      </Box>
    </Box>
  )
}

export default Welcome