import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../../app/home/Home";
import Login from "../../app/auth/login/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>} ></Route>
            <Route exact path="/login" element={<Login/>} ></Route>
        </Routes>
    );
}

