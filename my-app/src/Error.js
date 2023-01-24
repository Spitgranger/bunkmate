import React from 'react';
import { useRouteError } from "react-router-dom";
import './Error.css';

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <div>Error has Occured.</div>
  )
}

export default Error