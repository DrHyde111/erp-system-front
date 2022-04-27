import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    getWarehouseOverseers
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function WarehouseOverseers() {
    const context = useAppContext();
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        async function onLoad() {
            let response = await getWarehouseOverseers(id);
            setWarehouses(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    function handleRemove(id: { id: any }) {

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
                            {warehouses.length != 0 ? (
                                warehouses.map(({id, Name, Surname, Email}) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{Name}</th>
                                        <th>{Surname}</th>
                                        <th>{Email}</th>
                                        <th>
                                            <button className={"btn btn-danger"} onClick={() => handleRemove({id})}>
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
            </div>
        </div>
    );
}