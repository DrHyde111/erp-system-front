import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    deleteEmployee, getEmployee,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";

export default function Employee() {
    const context = useAppContext();
    const [employee, setEmployee] = useState({
        id: undefined,
        Email: undefined,
        Name: undefined,
        Surname: undefined,
        Address: undefined,
        City: undefined,
        BirthDate: undefined,
        EmployedDate: undefined,
        Role: undefined,
    });
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getEmployee(id);
            console.log(response);
            setEmployee(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])


    async function handleDelete() {
        let response = await deleteEmployee(id)
        return navigate("../employees")
    }

    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>

                {!isLoading ? (
                    <>

                        {employee.id != undefined ? (
                            <>
                                <div className={"row"}>
                                    <div className={"col-12 mb-5"}>
                                        <h1>Employee Id: {employee.id}</h1>
                                    </div>
                                </div>
                                <h2>Basic info</h2>
                                <table className="table table-striped mb-5">
                                    <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Surname</th>
                                        <th scope="col">Birthday</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <th>{employee.Email}</th>
                                        <th>{employee.Name}</th>
                                        <th>{employee.Surname}</th>
                                        <th>{employee.BirthDate}</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <h2>Employment info</h2>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Employed since</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{employee.EmployedDate}</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <h2>Account info</h2>
                                <table className="table table-striped mb-5">
                                    <thead>
                                    <tr>
                                        <th scope="col">Roles</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{employee.Role}</th>
                                    </tr>
                                    </tbody>
                                </table>

                                <h2>Actions</h2>
                                <button onClick={() => navigate('edit')} className={"btn btn-primary mr-3"}>Edytuj
                                </button>
                                <button onClick={() => navigate('attendance', {state: {employee: employee}})}
                                        className={"btn btn-primary mr-3"}>Show attendances
                                </button>
                                <button onClick={handleDelete} className={"btn btn-danger mr-3"}>Usuń
                                </button>
                            </>
                        ) : (
                            <p>You dont have attendances</p>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}