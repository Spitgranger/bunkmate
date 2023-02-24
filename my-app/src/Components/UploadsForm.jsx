import { useState, useReducer, useContext } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  UploadFile,
  LineBox,
  FormSingleLineInput,
  DropDownMenu,
} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import { MdUpload } from "react-icons/md"
import { useEffect } from 'react';
import { CreditValidationContext, ValuesObjectContext } from './GlobalStateManagement/ValidationContext'

const checkBoxStyles = {
  margin: "5px"
}

function Uploads({ forwardButton }) {
  const page2 = JSON.parse(localStorage.getItem("page1"))
  const { values, setValues } = useContext(ValuesObjectContext)
  const { creditError, creditHelperText } = useContext(CreditValidationContext)

  const handleFieldChange = (e, field) => {
    setValues(prevValue => ({ ...prevValue, [field]: e.target.value }));
  };

  //SSN/SIN validation
  //Must be 9 characters long
  //The field must be filled
  //Numbers only no special characters
  const [sinError, setSinError] = useState(false);
  const [sinHelperText, setSinHelperText] = useState('');

  const handleSocialNumberValidation = (values) => {
    const checkLength = values?.sin?.length !== 9;
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

    <FormSection title="Finances and Verification" message="If you have good finances you'll get a 'Strong Financials' badge that'll be visible to othe users" />
    {/* ranges from 10000 - 100000*/}
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" helperText={creditHelperText} error={creditError} field="Credit Score" placeHolder="ex. 740" value={values?.credit} onChange={(e) => { handleFieldChange(e, 'credit'); }} />,
      <DropDownMenu default={""} label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} value={values?.income} onChange={(e) => { handleFieldChange(e, 'income'); }} />,
      <FormSingleLineInput type="text" size="small" helperText={sinHelperText} value={values?.sin} field="SIN/SSN" placeHolder="ex. 234452874" onChange={(e) => { handleSSNChange(e) }} error={sinError} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Credit Score" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/docx", "application/doc"]} message="Void Check" />,
    ]
    } />
    <FormSection message="*Please upload at least two of the three" />
    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos={'85%'} helperText="Supported Files: pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["application/pdf", "application/docx", "application/doc"]} message="T4 Document" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Pay Stub" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Bank Statement" />,
    ]
    } />


    <br></br>
    <FormSection title="Background Check"
      message={"*Please upload at least two of the four. We'll use this data to perform a FREE background check. Should you pass you'll receive a 'No Criminal History' and 'ID verified' badge."}
    />

    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Driver's License" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Passport" />,
    ]
    } />
    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Study Permit" />,
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
    <ActionButton fontSize="15px" width="100%" onClick={forwardButton} type="submit" title="Submit" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Uploads;