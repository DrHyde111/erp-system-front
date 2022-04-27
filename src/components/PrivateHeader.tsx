import React from "react";
import "../styles/NotFound.css";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {useAppContext} from "../services/context.services";
import {useNavigate} from "react-router-dom";

export default function PrivateHeader() {
    const {isAuthenticated, setUserHasAuthenticated} = useAppContext();
    const navigate = useNavigate()

    function handleLogout() {
        if (setUserHasAuthenticated) {
            localStorage.removeItem("token")
            setUserHasAuthenticated(false)
            navigate("../")
        }
    }

    return (
        <div className="App-header bg-light">
            <div className="App container">
                <Navbar collapseOnSelect expand="md" className="mb-3">
                    <a href={"/"}>
                        <Navbar.Brand className="font-weight-bold text-muted">
                            ERP-System
                        </Navbar.Brand>
                    </a>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Navbar>
            </div>
        </div>
    );
}