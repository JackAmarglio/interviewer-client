import { connect } from "react-redux";
import * as React from 'react';
import { Toolbar, AppBar, Box, Typography, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { deleteUserInfo, getUserInfo, LogOut } from "../../utils/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import LoadingIndicator from "../../components/LoadingIndicator";
import { toast } from "react-toastify";
import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function HeaderBar(props) {
    const { loggedIn, dispatch } = props;
    const history = useHistory();
    const [info, setInfo] = useState({
        firstName: "",
        lastName: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = function () {
        dispatch(LogOut());
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const gotoProfile = () => {
        history.push('/profile')
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const clickHomeButton = () => {
        history.push('/');
    }
    const handleSubmit = function (event) {
        //  alert("sf");
        event.preventDefault();
        setIsLoading(true);
        dispatch(deleteUserInfo((err) => {
            setIsLoading(false);
            if (err) {
                toast(err, {
                    type: "error"
                });
                return;
            }
            toast("Successfully deleted", {
                type: "success"
            });
            return;
        }));
    };
    useEffect(() => {
        if (loggedIn) {
            dispatch(getUserInfo((userInfo) => {
                setInfo({ firstName: userInfo.firstName, lastName: userInfo.lastName })
            }));
        }
    }, [])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* {isLoading && <LoadingIndicator />} */}
            <AppBar position="static" color="secondary">
                <Toolbar>
                    {/* <FontAwesomeIcon onClick={clickHomeButton} icon={faHome} size="5x" style={{ marginLeft: 0, marginRight: 20, backgroundColor: "transparent" }} /> */}
                    <Box width={2} height={80} style={{ backgroundColor: 'white' }} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >

                        React Events
                    </Typography>
                    {loggedIn == false && (
                        <>
                            <Button color="inherit" href="/signin">
                                Sign In
                            </Button>
                            <Button color="inherit" href="/usertype">
                                Sign Up
                            </Button>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <Button color="inherit" type="submit">
                                    Delete User
                                </Button>
                            </Box>
                        </>
                    )}
                    {loggedIn == true && (
                        <React.Fragment>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                {info.firstName} {info.lastName}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={gotoProfile}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedHeaderBar = connect(mapStateToProps)(HeaderBar);

export { ConnectedHeaderBar as HeaderBar };
