import {JSX} from 'react'
import {useRouteError} from "react-router-dom";
import './Error.css';

function Error(): JSX.Element {
    const error = useRouteError();
    console.error(error);
    return (
        <div>Error has Occurred</div>
    )
}

export default Error