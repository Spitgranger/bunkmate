import './Applications.css'
import Navbar from '../Components/Navbar';
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
            <FormSingleLineInput type="text" field="First Name" placeHolder="Sam" />,
            <FormSingleLineInput type="text"field="Last Name" placeHolder="Jenkins" />
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
            <FormSingleLineInput type="text" field="Email" placeHolder="" />,
            <DatePicker type="number" label="Birthday" />
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput type="number"field="Phone Number" placeHolder="6472345124" />,
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
            <FormSingleLineInput type="number"field="Credit Score" placeHolder="ex. 740" />,
            <DropDownMenu label="Annual Income" menuItem={["$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "$200001 +"]} />,
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <MultipleSelectCheckmarks title="Verification" menuItems={["Rental History", "Credit Checks", "Credit References", "None of these", "What's This?",]}/>,
            <DropDownMenu label="Do you have a Guarantor?" menuItem={['Yes', 'No', "What's This?"]} />,
          ]
          } />
          <ActionButton title="Continue" />
        </section>



      </div>
    </>
  )
}
export default Appliciation;