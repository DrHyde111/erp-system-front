import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    attendanceControl,
    getEmployeeAttendances,
    getEmployees,
    getLastUserAttendance, getOverseerWarehouses, getWarehouses
} from "../../services/api.services";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";

export default function AllWarehouses() {
    const context = useAppContext();
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            console.log(context)
            let response
            if (context.user.Role == "Admin" || context.user.Role === "SuperUser") {
                response = await getWarehouses();
            } else {
                response = await getOverseerWarehouses(context.user.id)
            }
            setWarehouses(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])
    return (
        <div className={"AllWarehouses"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-8"}>
                        <h1>Warehouses</h1>
                    </div>
                    {context.user.Role === "Admin" ?
                        <div className={"col-12 col-md-4"}>
                            <button onClick={() => navigate("create")} className={"btn btn-primary"}>New warehouse
                            </button>
                        </div>
                        : <></>
                    }
                </div>
                {!isLoading ? (
                    <div className={"table-responsive"}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {warehouses.length != 0 ? (
                                warehouses.map(({id, Name, Address, City}) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{Name}</th>
                                        <th>{Address}</th>
                                        <th>{City}</th>
                                        <th>
                                            <button className={"btn btn-primary"} onClick={() => navigate(`${id}`)}>
                                                Więcej
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            ) : context.user.Role == "Admin" || context.user.Role === "SuperUser" ? (
                                    <p>There are no warehouses</p>
                                ) :
                                <p>
                                    You dont overseer any warehouse.
                                </p>
                            }
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