import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    attendanceControl, getEmployee,
    getEmployeeAttendances,
    getEmployees,
    getLastUserAttendance
} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

export default function Employee() {
    const context = useAppContext();
    const [employee, setEmployee] = useState({
        id: undefined,
        Email: undefined,
        Name: undefined,
        Surname: undefined,
        Address: undefined,
        City: undefined,
        BirthDate: undefined,
        EmployedDate: undefined,
        Roles: [],
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


    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>

                {!isLoading ? (
                    <>

                        {employee.id != undefined ? (
                            <>
                                <div className={"row"}>
                                    <div className={"col-12 mb-5"}>
                                        <h1>Employee Id: {employee.id}</h1>
                                    </div>
                                </div>
                                <h2>Basic info</h2>
                                <table className="table table-striped mb-5">
                                    <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Surname</th>
                                        <th scope="col">Birthday</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{employee.Email}</th>
                                        <th>{employee.Name}</th>
                                        <th>{employee.Surname}</th>
                                        <th>{employee.BirthDate}</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <h2>Employment info</h2>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Employed since</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{employee.EmployedDate}</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <h2>Account info</h2>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Roles</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{employee.Roles.toString()}</th>
                                    </tr>
                                    </tbody>
                                </table>
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