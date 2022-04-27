import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    asignWarehouseOverseer,
    getEmployees,
    getWarehouseOverseers,
    unasignWarehouseOverseer
} from "../../services/api.services";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function AssignOverseer() {
    const context = useAppContext();
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})
    let navigate = useNavigate();
    const {id} = useParams()
    const {state} = useLocation()
    // @ts-ignore
    const {overseers} = state

    useEffect(() => {
        async function onLoad() {
            let response = await getEmployees();

            // @ts-ignore
            let ids = overseers.map((item) => {
                return item.id
            })
            console.log(ids)
            // @ts-ignore
            let filteredEmployees = response.filter(item => {
                return !ids.includes(item.id)
            })

            setEmployees(filteredEmployees);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function handleAssign(overseerId: string) {
        try {
            let response = await asignWarehouseOverseer(id, overseerId)
            setMessage({status: 0, message: response.message});
            setEmployees(employees.filter(item => {
                const {id: id1} = item;
                return id1 !== overseerId;
            }))
        } catch (error) {
            if (typeof error == "string")
                setMessage({status: 1, message: error});
        }

    }

    return (
        <div className={"AllWarehouses"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-8"}>
                        <h1>Assign employees to overseers</h1>
                    </div>
                </div>
                {!isLoading ? (
                    <div className={"table-responsive"}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.length != 0 ? (
                                employees.map(({id, Name, Surname, Email}) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{Name}</th>
                                        <th>{Surname}</th>
                                        <th>{Email}</th>
                                        <th>
                                            <button className={"btn btn-success"} onClick={() => handleAssign(id)}>
                                                Assign
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <p>There are no more employees available to assign.</p>
                            )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Loading/>
                )}
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
            </div>
        </div>
    );
}