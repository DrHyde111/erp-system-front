import React from "react";
import "../styles/NotFound.css";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {useAppContext} from "../services/context.services";

export default function PublicHeader() {
    const {isAuthenticated, setUserHasAuthenticated} = useAppContext();

    function handleLogout() {
        if (setUserHasAuthenticated) {
            localStorage.removeItem("token")
            setUserHasAuthenticated(false)
        }
    }

    return (
        <div className="App-header bg-light">
            <div className="App container">
                <Navbar collapseOnSelect expand="md" className="mb-3">
                    <Navbar.Brand className="font-weight-bold text-muted">
                        ERP-System
                    </Navbar.Brand>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Navbar>
            </div>
        </div>
    );
}