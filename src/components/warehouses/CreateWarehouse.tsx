import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    createEmployee, createWarehouse,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function CreateWarehouse() {
    const context = useAppContext();
    const [warehouse, setWarehouse] = useState({
        Name: "",
        Address: "",
        City: "",
        Description: "",
    });
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false)
    }, [])


    async function handleSubmit() {
        let response = await createWarehouse(warehouse)
        return navigate("../warehouses")

    }

    function validation() {
        return (warehouse.Name != "" && warehouse.Address != "" && warehouse.City != "" && warehouse.Description != "");
    }

    return (
        <div className={"CreateEmployee"}>
            <div className={"container"}>

                {!isLoading ? (

                    <>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={warehouse.Name}
                                       onChange={(e) => setWarehouse({...warehouse, Name: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" value={warehouse.Address}
                                       onChange={(e) => setWarehouse({...warehouse, Address: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" value={warehouse.City}
                                       onChange={(e) => setWarehouse({...warehouse, City: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" value={warehouse.Description}
                                          onChange={(e) => setWarehouse({...warehouse, Description: e.target.value})}/>
                            </div>

                            <button disabled={!validation()} onClick={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }} className="btn btn-primary">Create
                            </button>
                        </form>
                    </>

                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
}