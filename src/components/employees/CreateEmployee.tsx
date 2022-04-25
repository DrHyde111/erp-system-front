import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    createEmployee,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";

export default function CreateEmployee() {
    const context = useAppContext();
    const [employee, setEmployee] = useState({
        Email: "",
        Name: "",
        Surname: "",
        Address: "",
        City: "",
        BirthDate: "",
        EmployedDate: "",
        Password: "",
        Role: "Admin"
    });
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false)
    }, [])


    async function handleSubmit() {
        let emp;
        emp = employee;
        let response = await createEmployee(employee)
        return navigate("../employees")

    }

    function validation() {
        return !(employee.Password != repeatPassword || employee.Password == "");
    }

    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>

                {!isLoading ? (

                    <>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={employee.Name}
                                       onChange={(e) => setEmployee({...employee, Name: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input type="text" className="form-control" value={employee.Surname}
                                       onChange={(e) => setEmployee({...employee, Surname: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" value={employee.Email}
                                       onChange={(e) => setEmployee({...employee, Email: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" value={employee.Address}
                                       onChange={(e) => setEmployee({...employee, Address: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" value={employee.City}
                                       onChange={(e) => setEmployee({...employee, City: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date" className="form-control" value={employee.BirthDate}
                                       onChange={(e) => setEmployee({...employee, BirthDate: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Date of employment</label>
                                <input type="date" className="form-control" value={employee.EmployedDate}
                                       onChange={(e) => setEmployee({
                                           ...employee,
                                           EmployedDate: e.target.value
                                       })}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" value={employee.Password}
                                       onChange={(e) => setEmployee({...employee, Password: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Repeat password</label>
                                <input type="password" className="form-control" value={repeatPassword}
                                       onChange={(e) => setRepeatPassword(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Choose role</label>
                                <select value={employee.Role}
                                        onChange={(e) => setEmployee({...employee, Role: e.target.value})}
                                        className="form-select">
                                    <option value="Admin">Admin</option>
                                    <option value="EmployeeMagasin">Magazynier</option>
                                    <option value="Employee">Pracownik</option>
                                </select>
                            </div>

                            <button disabled={!validation()} onClick={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }} className="btn btn-primary">Submit
                            </button>
                        </form>
                    </>

                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}