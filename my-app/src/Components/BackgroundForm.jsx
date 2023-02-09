import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
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
    picture: "",
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
  const [value, setValue] = useState(page1?.birthday ? page1?.birthday : dayjs('2022-09-15T21:11:54'));//if there is already a birthday use it, else default value.
  const handleChange = (newValue) => {
    try {
      newValue.toISOString();
      setValue((newValue), setValues(prevValue => ({ ...prevValue, birthday: newValue.toISOString().split('T')[0] })));
    }
    catch (error) {
      return
    }
  };

  //Handle conversion of uploaded file to base64 string
  const handleConversion = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
    };
  }
  //handle file uploads
  const handleFileUpload = e => {
    const file = e.target.files[0];
    handleConversion(file, (result) => {
      setValues((prevValue) => (
        { ...prevValue, picture: result }
      ));
    });
  }

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
      //loop through address components, takig each and checking their type
      const addressComponents = place.address_components
      addressComponents.forEach((component) => {
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
      //setValues({ ...values, city: place.address_components[3].long_name, country: place.address_components[6].long_name, province: place.address_components[5].long_name })
    });
  }, []);


  //Credit Score Validation
  //field greater than 0 less than 999
  //field can be left empty
  //field must be a string
  const [creditError, setCreditError] = useState(true);
  const [creditHelperText, setCreditHelperText] = useState('');

  const handleCreditValidation = (values) => {
    const checkGreaterThan = parseInt(values.credit) > 999;
    const checkLessThan = parseInt(values.credit) <= 0;
    const checkIsNumber = isNaN(parseInt(values.credit));
    const checkIsEmpty = (!values.credit);
    const validFormat = !/^\d+$/.test(values.credit);
    return [checkGreaterThan, checkLessThan, checkIsNumber, checkIsEmpty, validFormat];
  };

  const handleCreditLogic = (logic) => {
    const [checkGreaterThan, checkLessThan, checkIsNumber, checkIsEmpty, validFormat] = logic;
    if (!values.credit || checkGreaterThan || checkLessThan || checkIsNumber || validFormat) {
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
  }

  //Phone Number
  //field can't be empty
  //10 digits long
  //only numbers no special characters
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const handlePhoneValidation = (values) => {
    console.log(values);
    const checkLength = values.phone.length !== 10;
    const checkIsEmpty = !values.phone;
    const checkIsNumber = isNaN(parseInt(values.phone));
    const validFormat = !/^\d+$/.test(values.phone);
    return [checkLength, checkIsEmpty, checkIsNumber, validFormat];
  };

  const handlePhoneLogic = (logic) => {
    const [checkLength, checkIsEmpty, checkIsNumber, validFormat] = logic
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
    console.log(phoneError)
  };


  //email validation
  // use "@" symbol and "."
  //field can't be empty
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const handleEmailValidation = (values) => {
    const email = values.email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailHelperText('Please enter a valid email address')
    } else {
      setEmailError(false);
      setEmailHelperText('')
    }
  };

  //Social media link valdiation
  //must follow a specific syntax
  const [link, setLink] = useState(false);
  const [LinkHelperText, setLinkHelperText] = useState('Optional');

  const handleLinkValidation = (e) => {
    const link = e.target.value
    const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if (!linkRegex.test(link)) {
      setLink(true);
      setLinkHelperText('Please enter a valid url')
    } else {
      setLink(false);
      setLinkHelperText('')
    }
  };

  //Multilinetext validation
  //can't exceed 500 characters
  const [textHelperText, setTextHelperText] = useState("Max: 500 Characters");
  const [textError, setTextError] = useState(false);
  //{NOTE THE WAY THAT THIS STATE IS UPDATED PROBABLY NEEDS TO BE CHANGED} DONE!
  const handleTextField = (e) => {
    setValues(prevValue => ({
      ...prevValue, about: e.target.value
    }));
  }
  const checkValidity = (values) => {
    const length = values.about.split("").length
    if (length > 500) {
      setTextError(true);
      setTextHelperText(`Character limit reached. Delete ${length - 500} Characters`)
    } else {
      setTextError(false);
      setTextHelperText(`${length} / 500 Characters`)
    }
  }

  //memoize inputs to save rerendering all components on one change.


  //checks to see if individual fields are empty


  const [fieldError, setFieldError] = useState({
    /*birthday: null,*/
    picture: true,
    firstName: true,
    lastName: true,
    about: true,
    gender: true,
    email: true,
    phone: true,
    address: true,
    employment: true,
    education: true,
    credit: true,
    income: true,
  });
  //checks to see if all fields are empty
  const handleEmptyStringValidation = (field) => {
    if (values[field]) {
      setFieldError(prevValue => ({ ...prevValue, [field]: false }))
    } else if (!values[field]) {
      setFieldError(prevValue => ({ ...prevValue, [field]: true }))
    }
  }

  //event handler built just for validating images
  /*
  const handleUploadPictureValidation = (picture) => {
    if (values[picture]) {
      setFieldError(prevValue => ({ ...prevValue, [field]: false }))
    } else if (!values) {
      setFieldError(prevValue => ({ ...prevValue, [field]: true }))
    }
  }
*/
  //globalError will be set to false once all fields are validated
  const [globalError, setGlobalError] = useState(true)

  const handleGlobalError = (fieldError) => {
    //checks to see if all items within the object are false
    if (Object.values(fieldError).every(val => val === false)) {
      setGlobalError(false)
    } else if (Object.values(fieldError).some(val => val === true)) {
      setGlobalError(true)
    }
  }
  useEffect(() => { handleGlobalError(fieldError); }, [fieldError])

  const handleFieldChange = (e, field) => {
    setValues(prevValue => ({ ...prevValue, [field]: e.target.value }));
  };

  useEffect(() => {
    handleCreditLogic(handleCreditValidation(values));
    handlePhoneLogic(handlePhoneValidation(values));
    handleEmailValidation(values);
    checkValidity(values);
    Object.keys(fieldError).forEach((value) => handleEmptyStringValidation(value));
  }, [values]);
  /*
    useEffect(() => {
      setCreditError(creditError);
    }, [creditError])
  
    useEffect(() => {
      setPhoneError(phoneError)
    }, [phoneError])
  */
  return (<>


    <FormSection title="Profile"
      message="*Everything in this section will be visible to other people"
    />
    <div style={{ display: 'flex', justifyContent: 'center', borderRadius: "90px" }}>
      {values.picture ? <img src={values.picture} style={{ width: "100px", height: "100px", borderRadius: "50px" }}></img> : null}
    </div>
    <UploadFile helperText="Supported Files: jpg, png" helperTextPos="45%" width="50%" type="file" message="Upload Profile Picture" accept={["image/jpg", "image/jpeg", "image/png"]} endIcon={<CameraAltIcon sx={{ color: "aqua" }} />} handleFileUpload={handleFileUpload} />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size='small' type="text" field="Legal First Name" placeHolder="Sam" onChange={(e) => { handleFieldChange(e, 'firstName'); }} value={values.firstName} />,
      <FormSingleLineInput size="small" type="text" field="Legal Last Name" placeHolder="Jenkins" onChange={(e) => { handleFieldChange(e, 'lastName'); }} value={values.lastName} />,]
    } />
    <div id="multiline">
      <FormMultiLineInput placeHolder="Tell us a bit about yourself" type="text" field="About Me" helperText={textHelperText} onChange={(e) => { handleTextField(e); }} error={textError} value={values.about} />
    </div>

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Gender" menuItem={["Male", "Female", "Other"]} value={values.gender} onChange={(e) => { handleFieldChange(e, 'gender'); }} />,
      <FormSingleLineInput error={link} helperText={LinkHelperText} onChange={(e) => { handleFieldChange(e, 'links'); handleLinkValidation(e, 'links'); }} size="small" type="text" field="Social Media Profile" placeHolder="ex. https://www.linktr.ee/john_smith" value={values.links} />
    ]
    } />
    <br></br>

    <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else. We'll ask you for proof on the next page" />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" error={emailError} helperText={emailHelperText} value={values.email} onChange={(e) => { handleFieldChange(e, 'email'); }} />,
      <DatePicker label="Birthday" value={value} onChange={handleChange} />
    ]
    } />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput type="text" size="small" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" error={phoneError} onChange={(e) => { handleFieldChange(e, 'phone'); }} value={values.phone} />,
      <FormSingleLineAddressInput type="text" field="Address" placeHolder="31 West Street" inputRef={inputRef} value={values.address} onChange={(e) => { handleFieldChange(e, 'address'); }} />
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
      <DropDownMenu label="Employment Status" menuItem={["Currently Employed", "Currently Unemployed", "Currently Self Employed"]} value={values.employment} onChange={(e) => { handleFieldChange(e, "employment"); }} />,
      <DropDownMenu label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} value={values.education} onChange={(e) => { handleFieldChange(e, 'education'); }} />,
    ]
    } />
    <br></br>
    <FormSection title="Finances and Verification" message="*You can provide us proof later" />
    {/* ranges from 10000 - 100000*/}
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" helperText={creditHelperText} error={creditError} field="Credit Score" placeHolder="ex. 740" value={values.credit} onChange={(e) => { handleFieldChange(e, 'credit'); }} />,
      <DropDownMenu label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} value={values.income} onChange={(e) => { handleFieldChange(e, 'income'); }} />,
    ]
    } />

    <ActionButton disabled={globalError} fontSize="15px" width="100%" onClick={() => { forwardButton(); localStorage.setItem("page1", JSON.stringify(values)); }} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Background;