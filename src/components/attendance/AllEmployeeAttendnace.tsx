import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {attendanceControl, getEmployeeAttendances, getLastUserAttendance} from "../../services/api.services";
import {Button} from "react-bootstrap";
import Loading from "../Loading";

export default function AllEmployeeAttendnace() {
    const context = useAppContext();
    const [attendances, setAttendances] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

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
                        </tr>
                        </thead>
                        <tbody>
                        {attendances.length > 0 ? (
                            attendances.map(({id, TimeIn, TimeOut}) => (
                                <tr>
                                    <th scope="row">{id}</th>
                                    <td>{TimeIn}</td>
                                    <td>{TimeOut}</td>
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