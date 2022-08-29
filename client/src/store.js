import { createStore, applyMiddleware } from "redux";
import { AuthReducer } from "./reducers/authReducer";
import { IsLoggedIn } from "./utils/auth";
import thunk from "redux-thunk";

export const store = createStore(AuthReducer, applyMiddleware(thunk));
store.dispatch(IsLoggedIn());
