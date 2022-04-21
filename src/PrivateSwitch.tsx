import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import TimeRegister from "./components/attendance/TimeRegister";
import AllEmployeeAttendnace from "./components/attendance/AllEmployeeAttendnace";
import AllEmployees from "./components/employees/AllEmployees";
import Employee from "./components/employees/Employee";

export default function PrivateSwitch() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/time-register" element={<TimeRegister/>}/>
            <Route path="/attendances" element={<AllEmployeeAttendnace/>}/>
            <Route path="/employees/:id" element={<Employee/>}/>
            <Route path="/employees" element={<AllEmployees/>}/>
        </Routes>
    );
}