import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    deleteEmployee, getEmployee, getRemark,
} from "../../services/api.services";
import {useLocation, useNavigate, useParams} from "react-router-dom";

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
            let response = await getRemark(id, attendanceId);
            console.log(response);
            console.log(employee);

            setRemarks(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])


    async function handleDelete() {
        let response = await deleteEmployee(id)
        return navigate("../employees")
    }

    return (
        <div className={"TimeRegister"}>
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
                                        remarks.map(({id,Title, CreationDate}) => (
                                            <tr>
                                                <th scope="row">{Title}</th>
                                                <th>{CreationDate}</th>
                                                <th>
                                                    <button className={"btn btn-primary"} onClick={() => navigate(`${id}`)}>
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
                    <></>
                )}
            </div>
        </div>
    );
}