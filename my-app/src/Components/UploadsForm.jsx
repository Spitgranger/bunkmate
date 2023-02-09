import { useState, useReducer } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  UploadFile,
  LineBox,
  FormSingleLineInput,
} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import { MdUpload } from "react-icons/md"
import { useEffect } from 'react';


const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}

const checkBoxStyles = {
  margin: "5px"
}





function Uploads({ backwardButton, forwardButton }) {
  const page2 = JSON.parse(localStorage.getItem("page1"))
  const [values, setValues] = useState(page2);

  //SSN/SIN validation
  //Must be 9 characters long
  //The field must be filled
  //Numbers only no special characters
  const [sinError, setSinError] = useState(false);
  const [sinHelperText, setSinHelperText] = useState('');

  const handleSocialNumberValidation = (values) => {
    const checkLength = values?.sin.length !== 9;
    const checkIsEmpty = !values?.sin;
    const checkIsNumber = isNaN(parseInt(values?.sin));
    const validFormat = !/^\d+$/.test(values?.sin);


    if (checkLength || checkIsEmpty || checkIsNumber || validFormat) {
      setSinError(true);
    } else {
      setSinError(false);
    }

    if (checkIsEmpty) {
      setSinHelperText("This field can't be blank")
    } else if (checkIsNumber) {
      setSinHelperText('Please input numbers only')
    } else if (checkLength) {
      setSinHelperText('Please enter your 9 digit SIN/SSN (no spaces or special characters)')
    } else if (validFormat) {
      setSinHelperText("Please enter numbers only (no spaces or special characters)");
    } else {
      setSinHelperText("");
    }
  };

  const handleSSNChange = (e) => {
    setValues((prevValue) => ({ ...prevValue, sin: e.target.value }));
  }
  useEffect(() => { if (values?.sin) { handleSocialNumberValidation(values) } else { return } }, [values])

  return (<>
    <label style={{ cursor: 'pointer' }}>
      <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
      <h3 style={backButtonStyles}>
        <IoChevronBack />Back</h3>
    </label>

    <FormSection title="Finances Check"
      message="*if you have good finances you'll get a 'Strong Financials' badge that'll be visible to other users" />

    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/docx", "application/doc"]} message="Void Check" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Credit Score" />
    ]
    } />
    <FormSection message="*Please upload at least one of the two" />
    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos={'85%'} helperText="Supported Files: pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["application/pdf", "application/docx", "application/doc"]} message="T4 Document" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Pay Stub" />
    ]
    } />
    <br></br>
    <FormSection title="Background Check"
      message={"*Please upload at least one of the two. We'll use this data to perform a FREE background check. Should you pass you'll receive a 'No Criminal History' and 'ID verified' badge."}
    />

    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Driver's License" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Passport" />,
    ]
    } />
    <LineBox flex={true} CssTextField={[

      <FormSingleLineInput type="text" size="large" helperText={sinHelperText} value={values?.sin} field="SIN/SSN" placeHolder="ex. 234452874" onChange={(e) => { handleSSNChange(e) }} error={sinError} />,
    ]
    } />



    <FormSection message="I consent to the usage and collection of my information to perform background checks, this information will be shared with our real estate partners and can be deleted upon request" />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <label >
        <input style={checkBoxStyles} type="checkbox" />
        I understand and consent
      </label>
    </div>
    {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
    <ActionButton fontSize="15px" width="100%" onClick={forwardButton} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Uploads;