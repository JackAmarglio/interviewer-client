import { Routes } from "./routes/Routes";

import axios from "axios";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <Routes />
            <ToastContainer />
        </div>
    );
}

export default App;
