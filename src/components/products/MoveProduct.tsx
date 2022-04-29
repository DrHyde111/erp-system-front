import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    getProduct, getWarehouses, moveProduct,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";

export default function MoveProduct() {
    const context = useAppContext();
    const [product, setProduct] = useState({
        Name: "",
        Quantity: "",
        Unit: "",
        PricePerUnit: "",
        Description: ""
    });
    const [quantity, setQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [warehouses, setWarehouses] = useState([{id: "", Name: ""}])
    const [choosenWarehouse, setChoosenWarehouse] = useState({
        id: "",
        Name: ""
    })
    let navigate = useNavigate();
    const {id, productId} = useParams()

    useEffect(() => {
        async function onLoad() {
            let response = await getWarehouses();
            response = response.filter((item: any) => {
                return item.id != id
            })
            let product = await getProduct(id, productId)
            setWarehouses(response);
            setChoosenWarehouse(response[0])
            setProduct(product)
            setQuantity(product.Quantity)

        }

        onLoad()
        setIsLoading(false)
    }, [])


    async function handleSubmit() {
        try {
            let response = await moveProduct(id, productId, choosenWarehouse.id, {
                choosenQuantity: quantity
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
        // return navigate(`../warehouses/${id}/products`)

    }

    function validation() {
        return (quantity > 0);
    }

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        setChoosenWarehouse(JSON.parse(e.target.value))
    }

    return (
        <div className={"AddProduct"}>
            <div className={"container"}>

                {!isLoading ? (

                    <>
                        <form>
                            <div className="form-group">
                                <label>Specify quantity</label>
                                <input type="number" className="form-control"
                                       value={quantity}
                                       onChange={(e) => setQuantity(parseFloat(e.target.value))}/>
                            </div>

                            <div className="form-group">
                                <label>Choose warehouse to transfer</label>
                                <select
                                    onChange={handleChange}
                                    className="form-select w-100">
                                    {warehouses.map((item) =>
                                        (
                                            <option value={JSON.stringify(item)}>{item.Name}</option>
                                        )
                                    )}
                                </select>
                            </div>

                            <button disabled={!validation()} onClick={(e) => {
                                e.preventDefault();
                                handleSubmit()
                            }} className="btn btn-primary">Move
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