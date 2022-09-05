import axios from "axios";
import { API_URL, JWT_SECRET } from "../env";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

function _axios() {
    let bearToken = localStorage.getItem("eventBearerToken")
    return axios.create({
        headers: { 'Authorization': `EventTracker ${bearToken}` }
    });
}
const IsLoggedIn = () => {
    return (dispatch) => {
        try {
            var userData = jwt_decode(localStorage.getItem("eventBearerToken"));

            if (userData.exp && Date.now() < userData.exp * 1000) {
                //// token is valid token
                dispatch({ type: "LOG_IN" });
                dispatch({ type: "EMAIL_CONFIRMED", payload: userData.emailConfirmed });
            } else {
                dispatch({ type: "LOG_OUT" });
            }
        } catch (e) {
            dispatch({ type: "LOG_OUT" });
        }
    };
};
const LogIn = (data, callback) => {
    return function (dispatch) {
        const options = {
            url: `${API_URL}/auth/login`,
            method: "POST",
            data: data
        };
        _axios()(options)
            .then((resp) => {
                localStorage.setItem("eventBearerToken", resp.data.token);
                dispatch({ type: "LOG_IN" });
                dispatch({ type: "EMAIL_CONFIRMED", payload: resp.data.emailConfirmed });
                callback && callback();
            })
            .catch(err => {
                callback && callback(err.response.data.msg);
            });
    };
};

const getUserInfo = (callback) => {
    return function (dispatch) {
        const options = {
            url: `${API_URL}/account`,
            method: "GET"
        };
        _axios()(options)
            .then((resp) => {
                callback && callback(resp.data);
            })
            .catch(err => {
                callback && callback({});
            }).finally(() => {
                // callback && callback();
            });
    }

}
const Register = (data, callback) => {
    return function (dispatch) {
        const options = {
            url: `${API_URL}/auth`,
            method: "POST",
            data: data
        };
        _axios()(options)
            .then((resp) => {
                localStorage.setItem("eventBearerToken", resp.data.token);
                dispatch({ type: "LOG_IN" });
            })
            .catch(err => {
                callback && callback(err.response.data.msg);
            }).finally(() => {
                // callback && callback();
            });
    };
};

const LogOut = () => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/auth/logout`,
            method: "GET"
        };
        _axios()(options)
            .then(() => {
                localStorage.removeItem("eventBearerToken")
                dispatch({ type: "LOG_OUT" });
            })
            .catch(console.error);
    };
};

const SendVerifyEmail = (callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/auth/sendVerifyEmail`,
            method: "GET"
        };
        _axios()(options).then((resp) => {

            if (resp.data.status == 1) {
                callback && callback(1);
            }
            else if (resp.data.status == 2) {
                callback && callback(2);
            } else callback && callback(3);
        }).catch(err => {
            callback && callback(0, err);
        })
    };
};
const SendResetEmail = (state, callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/auth/sendResetEmail`,
            method: "POST",
            data: state
        };
        _axios()(options).then((resp) => {
            callback && callback();
        }).catch(err => {
            callback && callback(true, err.response.data.msg);
        })
    };
};

const VerifyEmail = (search, callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/auth/verifyEmail${search}`,
            method: "GET"
        };
        _axios()(options).then((resp) => {
            let decoded = jwtDecode(resp.data.token, JWT_SECRET);
            localStorage.setItem("eventBearerToken", resp.data.token);
            dispatch({ type: "EMAIL_CONFIRMED", payload: true });
            callback && callback(false);
        }).catch(err => {
            callback && callback(true, err.response.data.msg);
        })
    };
};
const ResetPassword = (state, callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/auth/resetPassword`,
            method: "POST",
            data: state
        };
        _axios()(options).then((resp) => {
            let token = resp.data.token;
            localStorage.setItem("eventBearerToken", token);
            dispatch({ type: "LOG_IN" })
            dispatch({ type: "EMAIL_CONFIRMED", payload: true })
            callback && callback();
        }).catch(err => {
            callback && callback(true, err.response.data.msg);
        })
    };
};

const updateUserInfo = (state, callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/account/update`,
            method: "POST",
            data: state
        };
        _axios()(options).then((resp) => {
            callback && callback();
        }).catch(err => {
            callback && callback(true, err.response.data.msg);
        })
    };
};

const deleteUserInfo = (callback) => {
    return (dispatch) => {
        const options = {
            url: `${API_URL}/account/delete`,
            method: "POST",
        };
        _axios()(options).then((resp) => {
            callback && callback();
        }).catch(err => {
            callback && callback(true, err.response.data.msg);
        })
    };
};
export { IsLoggedIn, LogIn, Register, LogOut, SendVerifyEmail, VerifyEmail, SendResetEmail, ResetPassword, getUserInfo, updateUserInfo, deleteUserInfo };
