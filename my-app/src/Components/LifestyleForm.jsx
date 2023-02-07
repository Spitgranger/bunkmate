import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  LineBox,
  FormSingleLineInput,
  DatePicker,
  DropDownMenu,
  DiscreteSliderMarks,

} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import { MdUpload } from "react-icons/md"


const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}

const checkBoxStyles = {
  margin: "5px"
}



function Lifestyle({ backwardButton, forwardButton }) {
  //SSN/SIN validation
  //Must be 9 characters long
  //The field must be filled
  //Numbers only no special characters
  const [sinError, setSinError] = useState(false);
  const [sinHelperText, setSinHelperText] = useState('');

  const handleSocialNumberValidation = (e) => {

    const checkLength = e.target.value.length !== 9;
    const checkIsEmpty = !e.target.value;
    const checkIsNumber = isNaN(parseInt(e.target.value));
    const validFormat = !/^\d+$/.test(e.target.value);

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
  return (<>
    <label style={{ cursor: 'pointer' }}>
      <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
      <h3 style={backButtonStyles}>
        <IoChevronBack />Back</h3>
    </label>

    <FormSection message="*Some of the information here will be used to match you with roomates and some of it will be used to build your profile" />
    <FormSection title="Living Preferences" />

    <LineBox flex={true} CssTextField={[
      <DatePicker label="Move in date" />,
      //$ input adornmnet start
      <FormSingleLineInput size="small" type="number" field="Rent Budget" placeHolder="ex. 900 dollars" />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" />,
      <DropDownMenu label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1 year plus"]} />,
    ]
    } />

    <br></br>
    <FormSection title="Habits and LifeStyle" />
    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Do you have pets" menuItem={["Yes", "No"]} />,
      <DropDownMenu label="Sleep Schedule" menuItem={["Early Bird", "Normal", "Night Owl"]} />,
      <DropDownMenu label="Cleanliness" menuItem={["Not clean", "Clean", "Very Clean"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Drinking" menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]} />,
      <DropDownMenu label="Smoking" menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Occupation" placeHolder="ex. Student/Pharmacist" />,
      <FormSingleLineInput size="small" type="text" field="Allergies?" placeHolder="ex. None/Nuts/Shellfish" />,
    ]
    } />

    <br></br>
    <FormSection title="Roomate Preferences" />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Ok with guests?" menuItem={["Yes", "No"]} />,
      <DropDownMenu label="Ok with pets?" menuItem={["Yes", "No"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Number of roomates" menuItem={["No Roomates", "1 Roomate", "2 Roomates", "3+ Roomates"]} />,
    ]} />
    <LineBox flex={true} CssTextField={[
      //slider
      <DropDownMenu label="Prefered roomate age" menuItem={['18 - 25', '26 - 30', '31-35', '36-40', '40+']} />,
      <DropDownMenu label="Prefered roomate gender" menuItem={["Male", "Female", "Other", "Any"]} />,
    ]
    }
    />
    <LineBox flex={true} CssTextField={[
      //slider
    ]
    }
    />
    {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
    <ActionButton fontSize="15px" width="100%" onSubmit={""} type="submit" title="Submit" />
  </>)
}

export default Lifestyle;