import React, {useEffect, useState} from "react";
import {useAppContext} from "../../services/context.services";
import {
    deleteEmployee, getEmployee, getRemarks, getSpecificRemark,
} from "../../services/api.services";
import {useNavigate, useParams} from "react-router-dom";

export default function Remark() {
    const context = useAppContext();
    const [remark, setRemark] = useState({
        id: undefined,
        Title: undefined,
        Content: undefined,
        CreationDate: undefined,
        Creator: {
            Name: undefined,
            Surname: undefined
        },
    });
    const [isLoading, setIsLoading] = useState(true)
    const {id, attendanceId, remarkId} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function onLoad() {
            let response = await getSpecificRemark(id, attendanceId, remarkId);
            console.log(response)
            setRemark(response);
        }

        const result = onLoad();
        setIsLoading(false)
    }, [])

    return (
        <div className={"TimeRegister"}>
            <div className={"container"}>
                {!isLoading ? (
                    <>

                        {remark.id != undefined ? (
                            <>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div className={"card"}>
                                            <div className={"card-body"}>
                                                <h1 className={"mb-3"}>Tytuł: {remark.Title}</h1>
                                                <p>Zawartość:</p>
                                                <p style={{whiteSpace:"pre-line"}}>{remark.Content}</p>
                                            </div>
                                            <div className={"card-footer"}>
                                                <p>Data utworzenia: {remark.CreationDate}</p>
                                                <p>Twórca: {remark.Creator.Name} {remark.Creator.Name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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