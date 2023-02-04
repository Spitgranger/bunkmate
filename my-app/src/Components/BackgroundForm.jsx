import { useState, useRef, useEffect } from 'react'
import {
  DatePicker,
  FormSection,
  ActionButton,
  UploadFile,
  DropDownMenu,
  FormSingleLineInput,
  FormSingleLineAddressInput,
  FormMultiLineInput,
  LineBox,
} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function Background({ forwardButton }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    about: "",
    city: "",
    country: "",
    address: "",
    province: "",
  });

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components"],
    types: []
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      //loop through address components, takig each and checking their type
      const addressComponents = place.address_components
      addressComponents.forEach((component) => {
        console.log(component);
        console.log(component.types[0])
        //each case, setting the form values accordingly.
        switch (component.types[0]) {
          case "locality":
            setValues(prevValue => ({ ...prevValue, city: component.long_name }))
            break;
          case "administrative_area_level_1":
            setValues(prevValue => ({ ...prevValue, province: component.long_name }))
            break;
          case "country":
            setValues(prevValue => ({ ...prevValue, country: component.long_name }))
        }
      })
      console.log(values);
      //setValues({ ...values, city: place.address_components[3].long_name, country: place.address_components[6].long_name, province: place.address_components[5].long_name })
    });
  }, []);
  /* Handles Credit Score Validation*/
  const [creditError, setCreditError] = useState(false);
  const [creditHelperText, setCreditHelperText] = useState('');

  //Credit Score Validation
  //field greater than 0 less than 999
  //field can be left empty
  //field must be a string

  const handleCreditLength = (e) => {

    const checkGreaterThan = parseInt(e.target.value) > 999;
    const checkLessThan = parseInt(e.target.value) <= 0;
    const checkIsNumber = isNaN(parseInt(e.target.value));
    const checkIsEmpty = (!e.target.value);
    const validFormat = !/^\d+$/.test(e.target.value);
    console.log(validFormat);

    if (!e.target.value || checkGreaterThan || checkLessThan || checkIsNumber || validFormat) {
      setCreditError(true);
    } else {
      setCreditError(false);
    }

    if (checkIsEmpty) {
      setCreditHelperText("This field can't be blank")
    } else if (checkIsNumber) {
      setCreditHelperText('Please enter numbers only')
    } else if (checkGreaterThan || checkLessThan) {
      setCreditHelperText('Please Enter a score between 1 and 999')
    } else if (validFormat) {
      setCreditHelperText('Not in a valid format');
    } else {
      setCreditHelperText("");
    }
  };

  //Phone Number
  //field can't be empty
  //10 digits long
  //only numbers no string
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const handlePhoneLength = (e) => {

    const checkLength = e.target.value.length !== 10;
    const checkIsEmpty = !e.target.value;
    const checkIsNumber = isNaN(parseInt(e.target.value));
    const validFormat = !/^\d+$/.test(e.target.value);

    if (checkLength || checkIsEmpty || checkIsNumber || validFormat) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (checkIsEmpty) {
      setPhoneHelperText("This field can't be blank")
    } else if (checkIsNumber) {
      setPhoneHelperText('Please input numbers only')
    } else if (checkLength) {
      setPhoneHelperText('Please enter a 10 digit phone number')
    } else if (validFormat) {
      setPhoneHelperText("Number is not in a valid format");
    } else {
      setPhoneHelperText("");
    }
  };


  //email validation
  // use "@" symbol and "."
  //field can't be empty
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

  //text verification
  const [textHelperText, setTextHelperText] = useState("Max: 500 Characters");
  const [textError, setTextError] = useState(false);
  const handleTextField = () => {
    const length = values.about.split("").length
    if (length > 500) {
      setTextError(true);
      setTextHelperText(`Character limit reached. Delete ${length - 500} characters`)
    } else {
      setTextError(false);
      setTextHelperText("Max: 500 Characters")
    }
  }

  const handleTextChange = e => {
    setValues(prevValue => (
      { ...prevValue, about: e.target.value }
    ))
  }

  return (<>
    <FormSection title="Profile"
      message="*Everything in this section will be visible to other people"
    />
    <UploadFile helperText="Supported Files: jpg, png, " helperTextPos="45%" width="50%" type="file" message="Upload Profile Picture" accept={["image/jpg", "image/jpeg", "image/png"]} endIcon={<CameraAltIcon sx={{ color: "aqua" }} />} />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size='small' type="text" field="Legal First Name" placeHolder="Sam" />,
      <FormSingleLineInput size="small" type="text" field="Legal Last Name" placeHolder="Jenkins" />,]
    } />
    <div id="multiline">
      <FormMultiLineInput placeHolder="tell us a bit about yourself" type="text" field="About Me" helperText={textHelperText} onBlur={handleTextField} onChange={handleTextChange} error={textError} />
    </div>

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Gender" menuItem={["Male", "Female", "Other"]} />,
      <FormSingleLineInput size="small" type="text" field="Linkedin Profile" placeHolder="(Optional)" />
    ]
    } />
    <br></br>

    <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else. We'll ask you for proof on the next page" />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" onBlur={handleEmailSyntax} error={emailError} helperText={emailHelperText} />,
      <DatePicker type="number" label="Birthday" />
    ]
    } />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput type="text" size="small" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" onBlur={handlePhoneLength} error={phoneError} />,
      <FormSingleLineAddressInput type="text" field="Address" placeHolder="31 West Street" inputRef={inputRef} />
    ]
    } />
    {values.city && values.country && values.province ?
      <LineBox flex={true} CssTextField={[
        <FormSingleLineInput size="small" type="text" field="City" placeHolder="New York" value={values.city} />,
        <FormSingleLineInput size="small" type="text" field="Country" placeHolder="United States" value={values.country} />,
        <FormSingleLineInput size="small" type="text" field="Province/State" placeHolder="Ontario" value={values.province} />
      ]
      } /> : null}
    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Employment" menuItem={["Current Employed", "Currently Unemployed", "Currently Self Employed"]} />,
      <DropDownMenu label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} />,
    ]
    } />
    <br></br>
    <FormSection title="Finances and Verification" message="*You can provide us proof later" />
    {/* ranges from 10000 - 100000*/}
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" helperText={creditHelperText} onBlur={handleCreditLength} error={creditError} field="Credit Score" placeHolder="ex. 740" />,
      <DropDownMenu label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} />,
    ]
    } />

    <ActionButton fontSize="15px" width="100%" onClick={forwardButton} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Background;