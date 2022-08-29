const initialState = {
    loggedIn: false,
    emailConfirmed: false
};
function AuthReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "LOG_IN":
            return { ... state, loggedIn: true };
        case "LOG_OUT":
            return { ...state , loggedIn: false };
        case "EMAIL_CONFIRMED":
            return { ...state, emailConfirmed: payload };
        default:
            return state;
    }
}

export { AuthReducer };
