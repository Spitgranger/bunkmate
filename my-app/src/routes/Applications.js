import './Applications.css'
import Navbar from '../Components/Navbar';
import { FormSection, ContinueButton, UploadFile, FormSingleLineInput, FormMultiLineInput } from '../Components/Form';

function Appliciation() {
  return (
    <>
      <Navbar />
      <div className="info">
        <section className="section">
          <FormSection title="Profile" message="
            *Everything in this section will be visible to other people"
          />
          <UploadFile message="Upload Profile Picture" />

          <FormSingleLineInput field1="First Name" field2="Last Name" placeHolder1="ex. Sam" placeHolder2="ex. Jenkins" />
          <div id="multiline">
            <FormMultiLineInput field="About Me" />
          </div>

          <FormSingleLineInput field1="Gender" field2="Socials" placeHolder2="ex. www.linkedin.com" />
          <br></br>

          <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else" />
          <FormSingleLineInput field1="Email" field2="Birthday" placeHolder2="mm/dd/year" />
          <FormSingleLineInput field1="Phone Number" field2="Address" placeHolder1="647 XXX XXXX" placeHolder2="31 West Street New York City" />
          <FormSingleLineInput field1="Employment" field2="Education" placeHolder1="ex. Carpenter" placeHolder2="ex. Undergrad" />
          {/*student or work */}
          {/*(highschool, undergrad, grad, finished school)*/}
          <br></br>

          <FormSection title="Finances" message="*You can provide us proof later" />
          <FormSingleLineInput field1="Credit Score" field2="Annual Income" placeHolder1="ex. 740" placeHolder2="ex. $70000 Usd" />
          <ContinueButton />
        </section>



      </div>
    </>
  )
}
export default Appliciation;