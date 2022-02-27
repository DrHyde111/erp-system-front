import React, {useEffect} from "react";
import {useAppContext} from "../services/context.services";

export default function TimeRegister() {
    const context = useAppContext();

    useEffect(()=>{
        console.log(context);
    },[])
    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h1>Dashboard {context.user.Name}</h1>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 col-md-6"}>
                        <a className={"card"} href={"/time-register"}>

                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}