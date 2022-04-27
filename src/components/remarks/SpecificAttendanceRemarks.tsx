import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    deleteEmployee, getEmployee, getRemarks,
} from "../../services/api.services";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function SpecificAttendanceRemarks() {
    const context = useAppContext();
    const [remarks, setRemarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const {id, attendanceId} = useParams();
    const {state} = useLocation()
    // @ts-ignore
    const {employee, attendance} = state

    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getRemarks(id, attendanceId);
            setRemarks(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    return (
        <div className={"SpecificAttendanceRemarks"}>
            <div className={"container"}>

                {!isLoading ? (
                    <>
                        {remarks.length > 0 ? (
                            <>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <h1>Employee: {employee.Name} {employee.Surname}</h1>
                                    </div>
                                    <div className={"col-12 mb-5"}>
                                        <h2>Time in: {attendance.TimeIn} </h2>
                                        <h2>Time Out: {attendance.TimeIn}</h2>
                                    </div>
                                </div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Creation date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {remarks.length != 0 ? (
                                        remarks.map(({id, Title, CreationDate}) => (
                                            <tr>
                                                <th scope="row">{Title}</th>
                                                <th>{CreationDate}</th>
                                                <th>
                                                    <button className={"btn btn-primary"}
                                                            onClick={() => navigate(`${id}`)}>
                                                        Więcej
                                                    </button>
                                                </th>
                                            </tr>
                                        ))
                                    ) : (
                                        <p>You dont have attendances</p>
                                    )}
                                    </tbody>
                                </table>


                            </>
                        ) : (
                            <p>You dont have attendances</p>
                        )}
                    </>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
}