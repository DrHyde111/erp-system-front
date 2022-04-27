import React, {useState} from "react";
import {Clock, Person} from "react-bootstrap-icons";
import {AiFillProfile} from "react-icons/all";

export default function Dashboard() {
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
                    <div className={"col-12 col-md-6 col-lg-4"}>
                        <a className={"card bg-primary text-center"} href={"/employees"}>
                            <Person size={50} color={"white"} className={"margin-0-auto mt-5"}/>
                            <p className={"color-white mt-5"}>Employees</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}