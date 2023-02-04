import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  UploadFile,
  LineBox,
  FormSingleLineInput,
} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { MdUpload } from "react-icons/md"

const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}

const checkBoxStyles = {
  margin: "5px"
}


function Uploads({ backwardButton, forwardButton }) {

  return (<>
    <label style={{ cursor: 'pointer' }}>
      <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
      <h3 style={backButtonStyles}>
        <IoChevronBack />Back</h3>
    </label>

    <FormSection title="Finances Check" message="*We collect this data for our algorithms, we won't share it with anyone else" />
    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/docx", "application/doc"]} message="Void Check" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Credit Score" />
    ]
    } />
    <FormSection message="*Please upload at least one of the two" />
    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf, docx, doc" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["application/pdf", "application/docx", "application/doc"]} message="T4 Document" />,
      <UploadFile helperTextPos='85%' helperText="Supported Files: pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept="application/pdf" message="Pay Stub" />
    ]
    } />
    <br></br>
    <FormSection title="Background Check"
      message={"*We'll use this data to perform a FREE background check. Should you pass you'll receive a 'No Criminal History' and 'ID verified' badge."}
    />

    <LineBox flex={true} CssTextField={[
      <UploadFile helperTextPos='85%' helperText="Supported Files: jpg, png, pdf" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png", "application/pdf"]} message="Driver's License" />,
      <FormSingleLineInput size="large" type="number" field="SIN/SSN" placeHolder="ex. 234234245" />,
    ]
    } />


    <FormSection message="I consent to the usage and collection of my information to perform background checks, this information will be shared with our real estate partners and can be deleted upon request" />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <label >
        <input style={checkBoxStyles} type="checkbox" />
        I understand and consent
      </label>
    </div>
    <ActionButton fontSize="15px" width="100%" onClick={forwardButton} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Uploads;