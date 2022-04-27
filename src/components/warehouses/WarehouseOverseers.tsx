import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {getWarehouseOverseers, unasignWarehouseOverseer} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function WarehouseOverseers() {
    const context = useAppContext();
    const [overseers, setOverseers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})
    let navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        async function onLoad() {
            let response = await getWarehouseOverseers(id);
            setOverseers(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function handleRemove(overseerId: string) {
        try {
            let response = await unasignWarehouseOverseer(id, overseerId)
            setMessage({status: 0, message: response.message});
            setOverseers(overseers.filter(item => {
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
                        <h1>Warehouse overseers</h1>
                    </div>
                    <div className={"col-12 col-md-4"}>
                        <button onClick={() => navigate("create")} className={"btn btn-primary"}>Add overseer</button>
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
                            {overseers.length != 0 ? (
                                overseers.map(({id, Name, Surname, Email}) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{Name}</th>
                                        <th>{Surname}</th>
                                        <th>{Email}</th>
                                        <th>
                                            <button className={"btn btn-danger"} onClick={() => handleRemove(id)}>
                                                Remove
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <p>Warehouse don't have assigned overseers</p>
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