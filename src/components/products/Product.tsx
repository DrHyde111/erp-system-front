import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    deleteEmployee, editProduct,
    getProduct,
    getWarehouseOverseers,
    getWarehouseProducts, removeProduct,
    unasignWarehouseOverseer
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function Product() {
    const context = useAppContext();
    const [product, setProduct] = useState({
        Name: "",
        Quantity: "",
        Unit: "",
        PricePerUnit: "",
        Description: ""
    });
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({status: -1, message: ""})
    let navigate = useNavigate();
    const {id, productId} = useParams()

    useEffect(() => {
        async function onLoad() {
            let response = await getProduct(id, productId);
            setProduct(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    async function handleRemove() {
        let response = await removeProduct(id, productId)
        return navigate(`../warehouses/${id}/products`)
    }

    async function handleChangePrice() {
        setMessage({status: -1, message: ""})
        let newPrice = Number(window.prompt("Type current quantity", ""));

        // @ts-ignore
        if (isNaN(newPrice)) {
            setMessage({status: 1, message: "Not a number"})
        }
        newPrice = Number(newPrice)
        setProduct({...product, PricePerUnit: newPrice.toString()})
        let response = await editProduct(id, productId, {...product, PricePerUnit: newPrice.toString()})
        setMessage(response)
    }

    async function handleChangeQuantity() {
        setMessage({status: -1, message: ""})
        let demandedQuantity = Number(window.prompt("Type current quantity", ""));

        // @ts-ignore
        if (isNaN(demandedQuantity)) {
            setMessage({status: 1, message: "Not a number"})
        }
        demandedQuantity = Number(demandedQuantity)
        if (demandedQuantity > Number(product.Quantity)) {
            setMessage({status: 1, message: "Demanded quantity larger then stock"})
        }
        setProduct({...product, Quantity: demandedQuantity.toString()})
        let response = await editProduct(id, productId, {...product, Quantity: demandedQuantity.toString()})
        setMessage(response)
    }

    return (
        <div className={"AllWarehouses"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-8"}>
                        <h1>Product</h1>
                    </div>
                </div>
                {!isLoading ? (
                    <>
                        <div className={"table-responsive"}>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">PricePerUnit</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">{product.Name}</th>
                                    <th>{product.Quantity}</th>
                                    <th>{product.Unit}</th>
                                    <th>{product.PricePerUnit} z??</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={"row mt-5"}>
                            <div className={"col-12"}>
                                <div className={"card"}>
                                    <div className={"card-header"}>
                                        <strong className={"m-0"}>Description</strong>
                                    </div>
                                    <div className={"card-body"}>
                                        <p>{product.Description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row mt-5"}>
                            <div className={"col-12"}>
                                <div className={"card"}>
                                    <div className={"card-header"}>
                                        <strong className={"m-0"}>Possible actions</strong>
                                    </div>
                                    <div className={"card-body"}>
                                        <button className={"btn btn-primary mr-3"}
                                                onClick={() => handleChangeQuantity()}>
                                            Change quantity
                                        </button>
                                        <button className={"btn btn-primary mr-3"}
                                                onClick={() => handleChangePrice()}>
                                            Change price
                                        </button>
                                        <button className={"btn btn-primary mr-3"} onClick={() => navigate("move")}>
                                            Move to other warehouse
                                        </button>
                                        <button className={"btn btn-danger mr-3"} onClick={() => handleRemove()}>Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
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