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
import dayjs from 'dayjs';

function Background({ forwardButton }) {
  const page1 = JSON.parse(localStorage.getItem("page1"))
  const [values, setValues] = useState(page1 ? page1 : {
    firstName: "",
    lastName: "",
    about: "",
    city: "",
    gender: "",
    country: "",
    address: "",
    province: "",
    links: "",
    employment: "",
    phone: "",
    education: "",
    email: "",
    income: "",
    credit: "",
    birthday: "",
  });
  const [value, setValue] = useState(page1.birthday ? page1.birthday : dayjs('2022-09-15T21:11:54'));//if there is already a birthday use it, else default value.
  const handleChange = (newValue) => {
    setValue((newValue), setValues(prevValue => ({ ...prevValue, birthday: newValue.toISOString().split('T')[0] })));
  };

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
          case "street_number":
            setValues(prevValue => ({ ...prevValue, address: component.long_name }))
            break;
          case "route":
            setValues(prevValue => ({ ...prevValue, address: prevValue.address + " " + component.long_name }))
            break;
          case "locality":
            setValues(prevValue => ({ ...prevValue, city: component.long_name }))
            break;
          case "administrative_area_level_1":
            setValues(prevValue => ({ ...prevValue, province: component.long_name }))
            break;
          case "country":
            setValues(prevValue => ({ ...prevValue, country: component.long_name }))
            break;
          default:
            break;
        }
      })
      console.log(values);
      //setValues({ ...values, city: place.address_components[3].long_name, country: place.address_components[6].long_name, province: place.address_components[5].long_name })
    });
  }, []);


  //Credit Score Validation
  //field greater than 0 less than 999
  //field can be left empty
  //field must be a string
  const [creditError, setCreditError] = useState(false);
  const [creditHelperText, setCreditHelperText] = useState('');

  const handleCreditValidation = (e) => {

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
      setCreditHelperText('Not in a valid format (no special characters)');
    } else {
      setCreditHelperText("");
    }
  };

  //Phone Number
  //field can't be empty
  //10 digits long
  //only numbers no special characters
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const handlePhoneValidation = (e) => {

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
      setPhoneHelperText('Please enter a 10 digit phone number (no spaces or special characters)')
    } else if (validFormat) {
      setPhoneHelperText("Please enter numbers only (no spaces or special characters)");
    } else {
      setPhoneHelperText("");
    }
  };


  //email validation
  // use "@" symbol and "."
  //field can't be empty
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const handleEmailValidation = (e) => {
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

  //Multilinetext verification
  //can't exceed 500 characters
  const [textHelperText, setTextHelperText] = useState("Max: 500 Characters");
  const [textError, setTextError] = useState(false);
  //NOTE THE WAY THAT THIS STATE IS UPDATED PROBABLY NEEDS TO BE CHANGED
  const handleTextField = (e) => {
    setValues({
      ...values, about: e.target.value
    }, checkValidity(e))
  }
  const checkValidity = (e) => {
    const length = e.target.value.split("").length
    if (length > 500) {
      setTextError(true);
      setTextHelperText(`Character limit reached. Delete ${length - 500} characters`)
    } else {
      setTextError(false);
      setTextHelperText("Max: 500 Characters")
    }
  }

  const handleGenderChange = e => {
    setValues(prevValue => ({ ...prevValue, gender: e.target.value }));
  }

  const handleNameChange = e => {
    setValues(prevValue => ({ ...prevValue, firstName: e.target.value }));
  }

  const handleEducationChange = e => {
    setValues(prevValue => ({ ...prevValue, education: e.target.value }));
  }

  const handleEmploymentChange = e => {
    setValues(prevValue => ({ ...prevValue, employment: e.target.value }));
  }
  const handleIncomeChange = e => {
    setValues(prevValue => ({ ...prevValue, income: e.target.value }));
  }
  const handleCreditChange = (e) => {
    setValues(prevValue => ({ ...prevValue, credit: e.target.value }));
  }
  const handleAddressChange = (e) => {
    setValues(prevValue => ({ ...prevValue, address: e.target.value }));
  }
  const handleEmailChange = (e) => {
    setValues(prevValue => ({ ...prevValue, email: e.target.value }));
  }
  const handleLastNameChange = (e) => {
    setValues(prevValue => ({ ...prevValue, lastName: e.target.value }));
  }
  const handlePhoneChange = (e) => {
    setValues(prevValue => ({ ...prevValue, phone: e.target.value }));
  }

  return (<>
    <FormSection title="Profile"
      message="*Everything in this section will be visible to other people"
    />
    <UploadFile helperText="Supported Files: jpg, png, " helperTextPos="45%" width="50%" type="file" message="Upload Profile Picture" accept={["image/jpg", "image/jpeg", "image/png"]} endIcon={<CameraAltIcon sx={{ color: "aqua" }} />} />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size='small' type="text" field="Legal First Name" placeHolder="Sam" onChange={handleNameChange} value={values.firstName} />,
      <FormSingleLineInput size="small" type="text" field="Legal Last Name" placeHolder="Jenkins" onChange={handleLastNameChange} value={values.lastName} />,]
    } />
    <div id="multiline">
      <FormMultiLineInput placeHolder="Tell us a bit about yourself" type="text" field="About Me" helperText={textHelperText} onChange={handleTextField} error={textError} value={values.about} />
    </div>

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Gender" menuItem={["Male", "Female", "Other"]} value={values.gender} onChange={handleGenderChange} />,
      <FormSingleLineInput size="small" type="text" field="Linkedin Profile" placeHolder="(Optional)" />
    ]
    } />
    <br></br>

    <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else. We'll ask you for proof on the next page" />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" onBlur={handleEmailValidation} error={emailError} helperText={emailHelperText} value={values.email} onChange={handleEmailChange} />,
      <DatePicker label="Birthday" onChange={handleChange} value={value} />
    ]
    } />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput type="text" size="small" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" onBlur={handlePhoneValidation} error={phoneError} onChange={handlePhoneChange} value={values.phone} />,
      <FormSingleLineAddressInput type="text" field="Address" placeHolder="31 West Street" inputRef={inputRef} value={values.address} onChange={handleAddressChange} />
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
      <DropDownMenu label="Employment" menuItem={["Current Employed", "Currently Unemployed", "Currently Self Employed"]} value={values.employment} onChange={handleEmploymentChange} />,
      <DropDownMenu label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} value={values.education} onChange={handleEducationChange} />,
    ]
    } />
    <br></br>
    <FormSection title="Finances and Verification" message="*You can provide us proof later" />
    {/* ranges from 10000 - 100000*/}
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" helperText={creditHelperText} onBlur={handleCreditValidation} error={creditError} field="Credit Score" placeHolder="ex. 740" value={values.credit} onChange={handleCreditChange} />,
      <DropDownMenu label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} value={values.income} onChange={handleIncomeChange} />,
    ]
    } />

    <ActionButton fontSize="15px" width="100%" onClick={() => { forwardButton(); localStorage.setItem("page1", JSON.stringify(values)) }} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Background;