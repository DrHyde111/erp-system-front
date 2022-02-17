import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

export default function Switch() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Login/>}/>
        </Routes>
    );
}