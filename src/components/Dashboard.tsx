import React, {useState} from "react";
import {Boxes, Clock, Person} from "react-bootstrap-icons";
import {useAppContext} from "../services/context.services";

export default function Dashboard() {
    const context = useAppContext()
    return (
        <div className="Dashboard">
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 col-lg-4"}>
                        <a className={"card bg-primary text-center"} href={"/time-register"}>
                            <Clock size={50} color={"white"} className={"margin-0-auto mt-5"}/>
                            <p className={"color-white mt-5"}>Time register</p>
                        </a>
                    </div>
                    {context.user.Role === "Admin" ?

                        <div className={"col-12 col-md-6 col-lg-4"}>
                            <a className={"card bg-primary text-center"} href={"/employees"}>
                                <Person size={50} color={"white"} className={"margin-0-auto mt-5"}/>
                                <p className={"color-white mt-5"}>Employees</p>
                            </a>
                        </div> : (<></>)
                    }
                    <div className={"col-12 col-md-6 col-lg-4"}>
                        <a className={"card bg-primary text-center"} href={"/warehouses"}>
                            <Boxes size={50} color={"white"} className={"margin-0-auto mt-5"}/>
                            <p className={"color-white mt-5"}>Warehouses</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}