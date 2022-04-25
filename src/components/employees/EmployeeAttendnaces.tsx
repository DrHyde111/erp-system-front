import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {attendanceControl, getEmployeeAttendances, getLastUserAttendance} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function EmployeeAttendances() {
    const {id} = useParams();
    const {state} = useLocation()
    // @ts-ignore
    const {employee} = state
    const [attendances, setAttendances] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            let response = []
            if (typeof id === "string") {
                response = await getEmployeeAttendances(parseInt(id));
            }
            console.log(response)
            setAttendances(response);
        }

        const result = onLoad();
        console.log(employee)
        setIsLoading(false)
    }, [])


    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Employee {employee.Name} {employee.Surname}</h1>
                    </div>
                </div>
                {!isLoading ? (
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TimeIn</th>
                            <th scope="col">TimeOut</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {attendances.length > 0 ? (
                            attendances.map(({id, TimeIn, TimeOut}) => (
                                <tr>
                                    <th scope="row">{id}</th>
                                    <td>{TimeIn}</td>
                                    <td>{TimeOut}</td>
                                    <td>
                                        <button onClick={() => navigate(`${id}/remarks`, {
                                            state: {
                                                employee: employee,
                                                attendance: {id: id, TimeIn: TimeIn, TimeOut: TimeOut}
                                            }
                                        })}
                                                className={"btn btn-primary"}>Remarks
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Employee dont have attendances</p>
                        )}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}