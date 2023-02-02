import { useState } from 'react'
import { 
  FormSection, 
  ActionButton, 
  UploadFile, 
  LineBox,
  } from './SubComponents/Form';

  

function Uploads ({ backwardButton, forwardButton }) {

      return (<>
          <label style={{cursor: 'pointer'}}>
            <input style={{display: 'none'}}onClick={backwardButton}type="button" />{"<- back"}
          </label>

          <FormSection title="Finances Check" message="*We collect this data for our algorithms, we won't share it with anyone else" />
              <LineBox flex={true} CssTextField={[
                <UploadFile message="Upload Driver's License" />,
                <UploadFile message="Upload SIN or SSN" />
              ]
              } />
              <LineBox flex={true} CssTextField={[
                <UploadFile message="Void Check" />,
                <UploadFile message="Credit Score" />
              ]
              } />
              <FormSection message="*Please upload at least of the two" />
              <LineBox flex={true} CssTextField={[
                <UploadFile message="Void Check" />,
                <UploadFile message="Credit Score" />
              ]
              } />
          <br></br>
          <FormSection title="Background Check"
            message={"*We'll use this data to perform a FREE background check. Should you pass you'll receive a 'No Criminal History' and 'ID verified' badge."}
            />

              <LineBox flex={true} CssTextField={[
                <UploadFile message="Pay Stub" />,
                <UploadFile message="T4 document" />,
              ]
              } />
          <FormSection message="I consent to the usage and collection of my information to perform background checks, this information will be shared with our real estate partners and can be deleted upon request" />
              <label style={{ padding: "10px"}}>
                <input type="checkbox" />
                ___________I understand and consent_____________
              </label>
            <ActionButton onClick={forwardButton} type="submit" title="Continue" />
        </>)
}

export default Uploads;