import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    attendanceControl,
    getEmployeeAttendances,
    getEmployees,
    getLastUserAttendance
} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function AllEmployees() {
    const context = useAppContext();
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getEmployees();
            console.log(response);
            setEmployees(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])


    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Your attendances</h1>
                    </div>
                </div>
                {!isLoading ? (
                    <div className={"table-responsive"}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.length > 0 ? (
                                employees.map(({id, Email, Name, Surname}) => (
                                    <tr onClick={() => navigate(`${id}`)}>
                                        <th scope="row">{id}</th>
                                        <th>{Email}</th>
                                        <th>{Name}</th>
                                        <th>{Surname}</th>
                                    </tr>
                                ))
                            ) : (
                                <p>You dont have attendances</p>
                            )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}