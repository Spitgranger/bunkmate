import './Applications.css';
import Navbar from '../Components/Navbar';
import { useState } from 'react'
import { 
  DatePicker, 
  FormSection, 
  ActionButton, 
  UploadFile, 
  DropDownMenu, 
  FormSingleLineInput, 
  FormMultiLineInput, 
  LineBox,
  MultipleSelectCheckmarks, } from '../Components/SubComponents/Form';

function Appliciation() {

  /* Handles Credit Score Validation*/
  const [creditError, setCreditError] = useState(false);
  const [creditHelperText, setCreditHelperText] = useState('');

  const handleCreditLength = (e) => {
    /* Implement more robust solution in the future. FYI: Canada's max credit score is 900 while in america it's 850*/
    const checkLength = e.target.value.length === 0 || e.target.value.length > 3;
    console.log(checkLength)
    setCreditError(checkLength)
    setCreditHelperText(checkLength? 'Please Enter a score between 0 and 999': '')
  }

  /* Handles Phone Number Validation*/
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const handlePhoneLength = (e) => {
    const checkLength = e.target.value.length !== 10;
    setPhoneError(checkLength)
    setPhoneHelperText(checkLength? 'Please Enter a 10 digit phone number': '')
  }

  /* Handles Email Syntax Validation */
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const handleEmailSyntax = (e) => {
    const email = e.target.value 
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
          setEmailError(true);
          setEmailHelperText('Please enter a valid email address')
        } else {
          setEmailError(false);
          setEmailHelperText('')
        }
      };

  return (
    <>
      <Navbar />
      <div className="info">
        <section className="section">
          <FormSection title="Profile"
            message="*Everything in this section will be visible to other people"
          />
          <UploadFile message="Upload Profile Picture" />

          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="text" field="Legal First Name" placeHolder="Sam" />,
            <FormSingleLineInput type="text"field="Legal Last Name" placeHolder="Jenkins" />
          ]
          } />
          <div id="multiline">
            <FormMultiLineInput type="text" field="About Me" helperText="Max: 500 Characters" />
          </div>

          <LineBox flex={true} CssTextField={[
            <DropDownMenu label="Gender" menuItem={["Male", "Female", "Other"]} />,
            <FormSingleLineInput type="text" field="Linkedin Profile" placeHolder="(Optional)" />
          ]
          } />
          <br></br>

          <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else" />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" onBlur={handleEmailSyntax} error={emailError} helperText={emailHelperText} />,
            <DatePicker type="number" label="Birthday" />
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="number" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" onBlur={handlePhoneLength} error={phoneError}/>,
            <FormSingleLineInput type="text" field="Address" placeHolder="31 West Street New York City" />
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="text"field="Employment" placeHolder="ex. N/A / Student / Researcher" />,
            <DropDownMenu label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} />,
          ]
          } />
          {/*student or work */}
          {/*(highschool, undergrad, grad, finished school)*/}
          <br></br>

          <FormSection title="Finances and Verification" message="*You can provide us proof later" />
          {/* ranges from 10000 - 100000*/}
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="number" helperText={creditHelperText} onBlur={handleCreditLength} error ={creditError}field="Credit Score" placeHolder="ex. 740" />,
            <DropDownMenu label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} />,
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <MultipleSelectCheckmarks title="Verification" menuItems={["Rental History", "Credit Checks", "Credit References", "None of these", "What's This?",]}/>,
            <DropDownMenu label="Do you have a Guarantor?" menuItem={['Yes', 'No', "What's This?"]} />,
          ]
          } />
          <ActionButton type="submit" title="Continue" />
        </section>



      </div>
    </>
  )
}
export default Appliciation;