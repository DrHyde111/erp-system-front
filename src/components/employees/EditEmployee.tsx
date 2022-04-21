import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    attendanceControl, deleteEmployee, editEmployee, getEmployee,
    getEmployeeAttendances,
    getEmployees,
    getLastUserAttendance
} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

export default function EditEmployee() {
    const context = useAppContext();
    const [employee, setEmployee] = useState({
        id: undefined,
        Email: "",
        Name: "",
        Surname: "",
        Address: "",
        City: "",
        BirthDate: "",
        EmployedDate: "",
    });
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getEmployee(id);
            console.log(response);
            setEmployee(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])


    async function handleSubmit() {
        let emp;
        emp = employee;
        let response = await editEmployee(employee.id, employee)
        return navigate("../employees")

    }

    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>

                {!isLoading ? (
                    <>

                        {employee.id != undefined ? (
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
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" value={employee.Email}
                                               onChange={(e) => setEmployee({...employee, Email: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Address</label>
                                        <input type="text" className="form-control" value={employee.Address}
                                               onChange={(e) => setEmployee({...employee, Address: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">City</label>
                                        <input type="text" className="form-control" value={employee.City}
                                               onChange={(e) => setEmployee({...employee, City: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Birthday</label>
                                        <input type="date" className="form-control" value={employee.BirthDate}
                                               onChange={(e) => setEmployee({...employee, BirthDate: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Date of employment</label>
                                        <input type="date" className="form-control" value={employee.EmployedDate}
                                               onChange={(e) => setEmployee({
                                                   ...employee,
                                                   EmployedDate: e.target.value
                                               })}/>
                                    </div>

                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit()
                                    }} className="btn btn-primary">Submit
                                    </button>
                                </form>
                            </>
                        ) : (
                            <p>You dont have attendances</p>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}