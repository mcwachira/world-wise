
import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";

const BackButton = () => {

    const navigate = useNavigate();
    return (
        <Button type='back' onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            navigate(-1)
        }}>&larr; Back</Button>
    )
}
export default BackButton
