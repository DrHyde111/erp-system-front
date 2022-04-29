import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    createRemark,
    deleteEmployee, getEmployee, getRemarks,
} from "../../services/api.services";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function SpecificAttendanceRemarks() {
    const context = useAppContext();
    const [remarks, setRemarks] = useState([]);
    const [newRemark, setNewRemark] = useState(
        {
            Title: "",
            Content: "",
            creatorId: context.user.id
        }
    )
    const [message, setMessage] = useState({status: -1, message: ""})
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1);
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

    useEffect(() => {
        async function onLoad() {
            let response = await getRemarks(id, attendanceId);
            setRemarks(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [reload])

    function validation() {
        return newRemark.Title != "" && newRemark.Content != "";
    }

    async function handleSubmit() {
        try {
            let response = await createRemark(id, attendanceId, newRemark)
            setMessage({status: 0, message: response.message});
            setNewRemark({
                Title: "",
                Content: "",
                creatorId: context.user.id
            })
            setReload(reload + 1)
        } catch (error) {
            if (typeof error == "string")
                setMessage({status: 1, message: error});
        }
    }

    return (
        <div className={"SpecificAttendanceRemarks"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        {message.status != -1 ? (
                            message.status == 0 ? (
                                <div className="alert alert-success">
                                    {message.message}
                                </div>) : (
                                <div className="alert alert-danger">
                                    {message.message}
                                </div>
                            )
                        ) : null}
                    </div>
                </div>
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
                                    {remarks.map(({id, Title, CreationDate}) => (
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
                                    ))}
                                    </tbody>
                                </table>


                            </>
                        ) : (
                            <p>Attendance dont have remarks</p>
                        )}
                        <>
                            <h1>Add remark to current attendance</h1>
                            <form className={"card col-12 p-3"}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={newRemark.Title}
                                           onChange={(e) => setNewRemark({...newRemark, Title: e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea className="form-control" value={newRemark.Content}
                                              onChange={(e) => setNewRemark({...newRemark, Content: e.target.value})}/>
                                </div>

                                <button disabled={!validation()} onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit()
                                }} className="btn btn-primary">Submit
                                </button>
                            </form>
                        </>
                    </>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
}