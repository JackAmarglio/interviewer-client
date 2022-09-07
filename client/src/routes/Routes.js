import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import Dashboard from "../pages/Dashboard";
import Usertype from "../pages/usertype";
import { SignUpOrg } from "../pages/auth/SignUpOrg";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
import { VerifyStatus } from "../pages/auth/VerifyStatus";
import { EditProfile } from "../pages/auth/EditProfile"
import { connect } from "react-redux";
import SuccessScreen from "../components/SuccessScreen";
import ClientInfo from "../pages/ClientInfo"
import InterpreterData from "../pages/InterpreterData"

function Routes(props) {
    const { loggedIn } = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><LandingPage /></Route>
                <Switch>
                    <Route exact path="/signin"><SignIn /></Route>
                    <Route exact path="/signup"><SignUp /></Route>
                    <Route exact path="/signuporg"><SignUpOrg /></Route>
                    <Route exact path="/usertype"><Usertype /></Route>
                    <Route exact path="/forgotpassword"><ForgotPassword /></Route>
                    <Route exact path="/resetPassword"><ResetPassword /></Route>
                    <Route exact path="/dashboard:id"><Dashboard /></Route>
                    <Route exact path="/clientinfo"><ClientInfo /></Route>
                    <Route exact path="/interpreterinfo"><InterpreterData /></Route>
                    <Redirect to={{ pathname: "/" }} />
                </Switch>
            </Switch>
        </BrowserRouter>
    );
}
function mapStateToProps(state) {
    const { loggedIn, emailConfirmed } = state;
    return { loggedIn: loggedIn, emailConfirmed: emailConfirmed };
}

const ConnectedRoutes = connect(mapStateToProps)(Routes);

export { ConnectedRoutes as Routes };

