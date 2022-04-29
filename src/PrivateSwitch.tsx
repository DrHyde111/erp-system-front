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
import AssignOverseer from "./components/warehouses/AssignOverseer";
import CreateWarehouse from "./components/warehouses/CreateWarehouse";
import WarehouseProducts from "./components/products/WarehouseProducts";
import AddProduct from "./components/products/AddProduct";
import Product from "./components/products/Product";
import MoveProduct from "./components/products/MoveProduct";
import {useAppContext} from "./services/context.services";

export default function PrivateSwitch() {
    const context = useAppContext()
    const userRole = context.user.Role
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/time-register" element={<TimeRegister/>}/>
            <Route path="/time-register/attendances" element={<AllEmployeeAttendnace/>}/>
            <Route path="/time-register/attendances/:attendanceId/remarks" element={<SpecificAttendanceRemarks/>}/>
            <Route path="/time-register/attendances/:attendanceId/remarks/:remarkId" element={<Remark/>}/>
            {userRole == "Admin" ? (
                <>
                    <Route path="/employees/:id/edit" element={<EditEmployee/>}/>
                    <Route path="/employees/:id/attendance" element={<EmployeeAttendances/>}/>
                    <Route path="/employees/:id/attendance/:attendanceId/remarks"
                           element={<SpecificAttendanceRemarks/>}/>
                    <Route path="/employees/:id/attendance/:attendanceId/remarks/:remarkId" element={<Remark/>}/>
                    <Route path="/employees/:id" element={<Employee/>}/>
                    <Route path="/employees/create" element={<CreateEmployee/>}/>
                    <Route path="/employees" element={<AllEmployees/>}/>
                    <Route path="/warehouses/:id/overseers/assign" element={<AssignOverseer/>}/>
                    <Route path="/warehouses/:id/overseers" element={<WarehouseOverseers/>}/>
                    <Route path="/warehouses/create" element={<CreateWarehouse/>}/>
                </>
            ) : (
                <></>
            )}
            <Route path="/warehouses/:id/products/:productId/move" element={<MoveProduct/>}/>
            <Route path="/warehouses/:id/products/:productId" element={<Product/>}/>
            <Route path="/warehouses/:id/products/add" element={<AddProduct/>}/>
            <Route path="/warehouses/:id/products" element={<WarehouseProducts/>}/>
            <Route path="/warehouses/:id" element={<Warehouse/>}/>
            <Route path="/warehouses" element={<AllWarehouses/>}/>
        </Routes>
    );
}