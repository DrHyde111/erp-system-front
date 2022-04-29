import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {attendanceControl, getEmployeeAttendances, getLastUserAttendance} from "../../services/api.services";
import {Button} from "react-bootstrap";
import Loading from "../Loading";
import {useNavigate} from "react-router-dom";

export default function AllEmployeeAttendnace() {
    const context = useAppContext();
    const [attendances, setAttendances] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            let response = await getEmployeeAttendances(context.user.id);
            console.log(response);
            setAttendances(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])


    return (
        <div className={"AllEmployeesAttendance"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Your attendances</h1>
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
                            attendances.map((attendance: any) => (
                                <tr>
                                    <th scope="row">{attendance.id}</th>
                                    <td>{attendance.TimeIn}</td>
                                    <td>{attendance.TimeOut}</td>
                                    <td>
                                        <button onClick={() => navigate(`${attendance.id}/remarks`, {
                                            state: {
                                                employee: context.user,
                                                attendance
                                            }
                                        })} className={"btn btn-primary"}>Remarks
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>You dont have attendances</p>
                        )}
                        </tbody>
                    </table>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
}