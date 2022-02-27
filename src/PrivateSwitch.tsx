import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import TimeRegister from "./components/attendance/TimeRegister";
import AllEmployeeAttendnace from "./components/attendance/AllEmployeeAttendnace";

export default function PrivateSwitch() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/time-register" element={<TimeRegister/>}/>
            <Route path="/attendances" element={<AllEmployeeAttendnace/>}/>
        </Routes>
    );
}