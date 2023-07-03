import './FormInput.css';
import React, { useState } from 'react';

function FormInput(props) {
  const { name, errormessage, keyname, placeholder, onChange, ...inputProps } = props;
  const [focus, setFocus] = useState(false);
  const handleFocus = (e) => {
    setFocus(true);
  }
  return (
    <div className="formInput">
      <label>{name}</label>
      <input className="inputField" name={keyname} placeholder={placeholder} {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focus.toString()}></input>
      <span className="errorMessageSpan">{errormessage}</span>
    </div>
  )
}

export default FormInput;