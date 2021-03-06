import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    attendanceControl,
    deleteEmployee, deleteWarehouse, getEmployee, getRemarks, getSpecificRemark, getWarehouse,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function Warehouse() {
    const context = useAppContext();
    const [warehouse, setWarehouse] = useState({
        id: undefined,
        Name: undefined,
        Address: undefined,
        City: undefined,
        Description: undefined,
    });
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})

    const {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getWarehouse(id);
            setWarehouse(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function handleDelete() {
        let answer = window.confirm("Are you sure you want to delete?")
        if (answer) {
            try {
                let response = await deleteWarehouse(id);
                navigate("../warehouses")

            } catch (error) {
                if (typeof error == "string")
                    setMessage({status: 1, message: error});
            }
        }
    }

    return (
        <div className={"Warehouse"}>
            <div className={"container"}>
                {!isLoading ? (
                    <>
                        {warehouse.id != undefined ? (
                            <>
                                <div className={"row mb-3"}>
                                    <div className={"col-12"}>
                                        <div className={"card"}>
                                            <div className={"card-body"}>
                                                <h1 className={"mb-3"}>Name: {warehouse.Name}</h1>
                                                <p>Description:</p>
                                                <p style={{whiteSpace: "pre-line"}}>{warehouse.Description}</p>
                                            </div>
                                            <div className={"card-footer"}>
                                                <p>Address: {warehouse.Address}</p>
                                                <p>City: {warehouse.City}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row mb-3"}>
                                    <div className={"col-12"}>

                                        <button className={"btn btn-primary mr-3"}
                                                onClick={() => navigate("products")}>Products
                                        </button>
                                        {context.user.Role === "Admin" ?
                                            <>
                                                <button className={"btn btn-primary mr-3"}
                                                        onClick={() => navigate("overseers")}>Overseers
                                                </button>
                                                <button className={"btn btn-danger"}
                                                        onClick={() => handleDelete()}>Delete warehouse
                                                </button>
                                            </>
                                            : <></>
                                        }

                                    </div>
                                </div>
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