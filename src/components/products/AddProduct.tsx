import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    addProduct,
    createEmployee, createWarehouse,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function AddProduct() {
    const context = useAppContext();
    const [product, setProduct] = useState({
        Name: "",
        Quantity: "",
        Unit: "",
        PricePerUnit: "",
        Description: ""
    });
    const [isLoading, setIsLoading] = useState(true)
    let navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        setIsLoading(false)
    }, [])


    async function handleSubmit() {
        let response = await addProduct(id, product)
        return navigate(`../warehouses/${id}/products`)

    }

    function validation() {
        return (product.Name != "" && product.Quantity != "" && product.Unit != "" && product.PricePerUnit != "");
    }

    return (
        <div className={"AddProduct"}>
            <div className={"container"}>

                {!isLoading ? (

                    <>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={product.Name}
                                       onChange={(e) => setProduct({...product, Name: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="number" className="form-control" value={product.Quantity}
                                       onChange={(e) => setProduct({...product, Quantity: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Unit</label>
                                <input type="text" className="form-control" value={product.Unit}
                                       onChange={(e) => setProduct({...product, Unit: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Price per unit</label>
                                <input type="number" className="form-control" value={product.PricePerUnit}
                                       onChange={(e) => setProduct({...product, PricePerUnit: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" value={product.Description}
                                          onChange={(e) => setProduct({...product, Description: e.target.value})}/>
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