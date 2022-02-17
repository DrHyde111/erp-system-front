import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import {Navbar} from "react-bootstrap";
import Switch from "./Switch";

function App() {
    return (
        <>
            <div className="App-header bg-light">
                <div className="App container">
                    <Navbar collapseOnSelect expand="md" className="mb-3">
                        <Navbar.Brand className="font-weight-bold text-muted">
                            ERP-System
                        </Navbar.Brand>
                    </Navbar>
                </div>
            </div>
            <Switch/>
        </>
    );
}

export default App;
