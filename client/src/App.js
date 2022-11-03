import { RoutesData } from "./routes";

import axios from "axios";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <RoutesData />
            <ToastContainer />
        </div>
    );
}

export default App;
