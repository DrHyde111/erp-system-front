import React, {useState} from "react";

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
                    <div className={"col-12 col-md-6"}>
                        <a className={"card"} href={"/time-register"}>
                            In/Out register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}