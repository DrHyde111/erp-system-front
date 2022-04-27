import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {attendanceControl, createEmployee, createRemark, getLastUserAttendance} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";

export default function TimeRegister() {
    const context = useAppContext();
    const [lastAttendance, setLastAttendance] = useState({id: 0, TimeIn: 0, TimeOut: 0});
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})
    const navigate = useNavigate()
    const [remark, setRemark] = useState({
        Title: "",
        Content: "",
        creatorId: context.user.id
    })

    useEffect(() => {
        async function onLoad() {
            let response = await getLastUserAttendance(context.user.id);
            setLastAttendance(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function checkInOut() {
        try {
            let response = await attendanceControl(context.user.id);
            setLastAttendance(response.Attendance);
            setMessage({status: 0, message: response.message});
        } catch (error) {
            if (typeof error == "string")
                setMessage({status: 1, message: error});
        }

    }

    function validation() {
        return remark.Title != "" && remark.Content != "";
    }

    async function handleSubmit() {
        try {
            let response = await createRemark(context.user.id, lastAttendance.id.toString(), remark)
            setMessage({status: 0, message: response.message});
            setRemark({
                Title: "",
                Content: "",
                creatorId: context.user.id
            })
        } catch (error) {
            if (typeof error == "string")
                setMessage({status: 1, message: error});
        }
    }

    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Your current attendance</h1>
                    </div>
                </div>
                {!isLoading ? (
                    <div className={"row"}>
                        <div className={"col-12 card mb-5"}>
                            <div className={"row p-3"}>
                                <div className={"col-12 col-md-6"}>
                                    <p>Time in</p>
                                    <p>{lastAttendance.TimeIn}</p>
                                </div>
                                <div className={"col-12 col-md-6"}>
                                    <p>Time out</p>
                                    <p>{lastAttendance.TimeOut}</p>
                                </div>
                                <div className={"col-12"}>
                                    <Button onClick={checkInOut}>
                                        {lastAttendance.TimeOut != null || lastAttendance.TimeIn == null ? ("Enter Work") : ("Leave Work")}
                                    </Button>
                                    <button className={"btn btn-primary ml-5"} onClick={() => navigate("/attendances")}>
                                        My attendances
                                    </button>
                                </div>
                            </div>

                        </div>
                        {lastAttendance.TimeOut == null ?
                            <>
                                <h1>Add remark to current attendance</h1>
                                <form className={"card col-12 p-3"}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className="form-control" value={remark.Title}
                                               onChange={(e) => setRemark({...remark, Title: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Content</label>
                                        <textarea className="form-control" value={remark.Content}
                                                  onChange={(e) => setRemark({...remark, Content: e.target.value})}/>
                                    </div>

                                    <button disabled={!validation()} onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit()
                                    }} className="btn btn-primary">Submit
                                    </button>
                                </form>
                            </> : ""}

                        <div className={"col-12 col-md-6 mb-5"}>

                        </div>
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
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
}