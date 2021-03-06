import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import {signIn} from "../services/api.services";
import {useAppContext} from "../services/context.services";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setUserHasAuthenticated, setUser} = useAppContext();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    // @ts-ignore
    async function handleSubmit(event) {
        event.preventDefault();
        let response;
        try {
            response = await signIn(email, password)
            if (setUserHasAuthenticated) {
                setUserHasAuthenticated(true);
                if (setUser) {
                    setUser(response.employeeInfo);
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </div>
    );
}