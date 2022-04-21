import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {attendanceControl, getLastUserAttendance} from "../../services/api.services";
import {Button} from "react-bootstrap";

export default function TimeRegister() {
    const context = useAppContext();
    const [lastAttendance, setLastAttendance] = useState({id: 0, TimeIn: 0, TimeOut: 0});
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})

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
                        <div className={"col-12"}>
                            <div className={"card"}>
                                <div className={"row"}>
                                    <div className={"col-12 col-md-6"}>
                                        <p>Time in</p>
                                        <p>{lastAttendance.TimeIn}</p>
                                    </div>
                                    <div className={"col-12 col-md-6"}>
                                        <p>Time out</p>
                                        <p>{lastAttendance.TimeOut}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-12"}>
                            <Button onClick={checkInOut}>
                                {lastAttendance.TimeOut != null ? ("Enter Work") : ("Leave Work")}
                            </Button>
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
                        <div className={"col-12 col-md-6"}>
                            <a className={"card"} href={"/attendances"}>
                                My attendances
                            </a>
                        </div>
                    </div>


                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}