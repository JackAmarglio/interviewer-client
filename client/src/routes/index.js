import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
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
import InterpreterWork from "../pages/InterpreterWork"
import UpdateWorktime from '../pages/UpdateWorktime'

function RoutesDatas(props) {
    const { loggedIn } = props;
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signuporg" element={<SignUpOrg />} />
                <Route exact path="/usertype" element={<Usertype />} />
                <Route exact path="/forgotpassword" element={<ForgotPassword />} />
                <Route exact path="/resetPassword" element={<ResetPassword />} />
                <Route exact path="/dashboard/:id" element={<Dashboard />} />
                <Route exact path="/clientinfo" element={<ClientInfo />} />
                <Route exact path="/interpreterinfo" element={<InterpreterData />} />
                <Route exact path="/interpreterinfo/:id" element={<InterpreterWork />} />
                <Route exact path="/user-info/:id" element={<UpdateWorktime />} />
            </Routes>
        </BrowserRouter>
    );
}
function mapStateToProps(state) {
    const { loggedIn, emailConfirmed } = state;
    return { loggedIn: loggedIn, emailConfirmed: emailConfirmed };
}

const ConnectedRoutes = connect(mapStateToProps)(RoutesDatas);

export { ConnectedRoutes as RoutesData };

