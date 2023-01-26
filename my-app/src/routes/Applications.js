import './Applications.css'
import Navbar from '../Components/Navbar';
import { MaterialUIPickers, FormSection, ActionButton, UploadFile, DropDownMenu, FormSingleLineInput, FormMultiLineInput, LineBox } from '../Components/SubComponents/Form';


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
            <FormSingleLineInput field="First Name" placeHolder="Sam" />,
            <FormSingleLineInput field="Last Name" placeHolder="Jenkins" />
          ]
          } />
          <div id="multiline">
            <FormMultiLineInput field="About Me" helperText="Max: 500 Characters" />
          </div>

          <LineBox flex={true} CssTextField={[
            <DropDownMenu name="Gender" menuItem={["Male", "Female", "Other"]} />,
            <FormSingleLineInput field="Linkedin Profile" placeHolder="(Optional)" />
          ]
          } />
          <br></br>

          <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else" />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput field="Email" placeHolder="" />,
            <MaterialUIPickers label="Birthday" />
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput field="Phone Number" placeHolder="6472345124" />,
            <FormSingleLineInput field="Address" placeHolder="31 West Street New York City" />
          ]
          } />
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput field="Employment" placeHolder="ex. N/A / Student / Researcher" />,
            <DropDownMenu name="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} />,
          ]
          } />
          {/*student or work */}
          {/*(highschool, undergrad, grad, finished school)*/}
          <br></br>

          <FormSection title="Finances" message="*You can provide us proof later" />
          {/* ranges from 10000 - 100000*/}
          <LineBox flex={true} CssTextField={[
            <FormSingleLineInput field="Credit Score" placeHolder="740" />,
            <DropDownMenu name="Annual Income" menuItem={["$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "$200001 +"]} />,
          ]
          } />
          <ActionButton title="Continue" />
        </section>



      </div>
    </>
  )
}
export default Appliciation;