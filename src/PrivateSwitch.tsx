import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import TimeRegister from "./components/attendance/TimeRegister";
import AllEmployeeAttendnace from "./components/attendance/AllEmployeeAttendnace";
import AllEmployees from "./components/employees/AllEmployees";
import Employee from "./components/employees/Employee";
import EditEmployee from "./components/employees/EditEmployee";
import CreateEmployee from "./components/employees/CreateEmployee";
import EmployeeAttendances from "./components/employees/EmployeeAttendnaces";
import SpecificAttendanceRemarks from "./components/remarks/SpecificAttendanceRemarks";
import Remark from "./components/remarks/Remark";
import AllWarehouses from "./components/warehouses/AllWarehouses";
import Warehouse from "./components/warehouses/Warehouse";
import WarehouseOverseers from "./components/warehouses/WarehouseOverseers";

export default function PrivateSwitch() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/time-register" element={<TimeRegister/>}/>
            <Route path="/attendances" element={<AllEmployeeAttendnace/>}/>
            <Route path="/employees/:id/edit" element={<EditEmployee/>}/>
            <Route path="/employees/:id/attendance" element={<EmployeeAttendances/>}/>
            <Route path="/employees/:id/attendance/:attendanceId/remarks" element={<SpecificAttendanceRemarks/>}/>
            <Route path="/employees/:id/attendance/:attendanceId/remarks/:remarkId" element={<Remark/>}/>
            <Route path="/employees/:id" element={<Employee/>}/>
            <Route path="/employees/create" element={<CreateEmployee/>}/>
            <Route path="/employees" element={<AllEmployees/>}/>
                <Route path="/warehouses/:id/overseers" element={<WarehouseOverseers/>}/>
                <Route path="/warehouses/:id" element={<Warehouse/>}/>
            <Route path="/warehouses" element={<AllWarehouses/>}/>
        </Routes>
    );
}