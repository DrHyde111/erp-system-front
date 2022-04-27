import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {getWarehouseOverseers, getWarehouseProducts, unasignWarehouseOverseer} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function WarehouseProducts() {
    const context = useAppContext();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})
    let navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        async function onLoad() {
            let response = await getWarehouseProducts(id);
            setProducts(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function handleRemove(overseerId: string) {
        try {
            let response = await unasignWarehouseOverseer(id, overseerId)
            setMessage({status: 0, message: response.message});
            setProducts(products.filter(item => {
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
                        <h1>Products in warehouse id {id}</h1>
                    </div>
                    <div className={"col-12 col-md-4"}>
                        <button onClick={() => navigate("add",)}
                                className={"btn btn-primary"}>Add product
                        </button>
                    </div>
                </div>
                {!isLoading ? (
                    <div className={"table-responsive"}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit</th>
                                <th scope="col">PricePerUnit</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length != 0 ? (
                                products.map(({id, Name, Quantity, Unit, PricePerUnit}) => (
                                    <tr>
                                        <th scope="row">{Name}</th>
                                        <th>{Quantity}</th>
                                        <th>{Unit}</th>
                                        <th>{PricePerUnit} zł</th>
                                        <th>
                                            <button className={"btn btn-primary"} onClick={() => navigate(`${id}`)}>
                                                More
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