import React from "react";
import "../styles/NotFound.css";
import {Navbar} from "react-bootstrap";

export default function PublicHeader() {
    return (
        <div className="App-header bg-light">
            <div className="App container">
                <Navbar collapseOnSelect expand="md" className="mb-3">
                    <Navbar.Brand className="font-weight-bold text-muted">
                        ERP-System
                    </Navbar.Brand>
                </Navbar>
            </div>
        </div>
    );
}