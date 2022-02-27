import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import TimeRegister from "./components/TimeRegister";

export default function PrivateSwitch() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/time-register" element={<TimeRegister/>}/>
        </Routes>
    );
}