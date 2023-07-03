import { createContext, useState, useEffect } from 'react';
import { getProfile } from '../../api';
import dayjs from 'dayjs';

export const LinkValidationContext = createContext(null)
export const ValuesObjectContext = createContext(null)
export const ImageValidationContext = createContext(null)
export const BirthdayValidationContext = createContext(null)
export const PhoneValidationContext = createContext(null)
export const CreditValidationContext = createContext(null)
export const EmailValidationContext = createContext(null)
export const AboutValidationContext = createContext(null)
export const GlobalValidationContext = createContext(null)

export default function ValidationProvider({ children }) {
  useEffect(() => {
    const handleProfile = async () => {
      const profile = await getProfile()
      return profile
    }
    handleProfile().then((profile) => { setValues(profile.data); });
  }, [])


  const [values, setValues] = useState({
    picture: "",
    firstName: "",
    lastName: "",
    about: "",
    age: "",
    city: "",
    gender: "",
    country: "",
    address: "",
    province: "",
    employment: "",
    phone: "",
    education: "",
    email: "",
    birthday: "",
    cannabis: "",
    havePets: "",
    sleepSchedule: "",
    cleanliness: "",
    drinking: "",
    smoking: "",
    occupation: "",
    tolerateGuests: "",
    toleratePets: "",
  });



  //checks to see if individual fields are empty
  const [fieldError, setFieldError] = useState({
    birthday: true,
    picture: true,
    firstName: true,
    lastName: true,
    about: true,
    age: true,
    gender: true,
    email: true,
    phone: true,
    address: true,
    employment: true,
    education: true,
    cannabis: true,
    havePets: true,
    sleepSchedule: true,
    cleanliness: true,
    drinking: true,
    smoking: true,
    occupation: true,
    tolerateGuests: true,
    toleratePets: true,
  });

  //checks to see if all fields are empty
  const handleLocalError = (field) => {
    if (values[field]) {
      setFieldError(prevValue => ({ ...prevValue, [field]: false }))
    } else if (!values[field]) {
      setFieldError(prevValue => ({ ...prevValue, [field]: true }))
    }
  }
  //globalError will be set to false once all fields are validated
  const [globalError, setGlobalError] = useState(true)

  const handleGlobalError = (fieldError) => {
    //console.log(fieldError)
    //checks to see if all items within the object are false
    if (Object.values(fieldError).every(val => val === false)) {
      setGlobalError(false)
    } else if (Object.values(fieldError).some(val => val === true)) {
      setGlobalError(true)
    }
  }
  useEffect(() => { handleGlobalError(fieldError); }, [fieldError])

  //Birthday Validation
  //must follow a specific syntax
  const [birthday, setBirthday] = useState("");//if there is already a birthday use it, else default value.
  const handleBirthdayChange = (newValue) => {
    try {
      newValue.toISOString();
      setBirthday((newValue), setValues(prevValue => ({ ...prevValue, birthday: newValue.toISOString().split('T')[0] })));
    }
    catch (error) {
      setBirthday((newValue), setValues(prevValue => ({ ...prevValue, birthday: "" })));
    }
  };

  //Phone Number
  //field can't be empty
  //10 digits long
  //only numbers no special characters
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const handlePhoneValidation = (values) => {
    const checkLength = values?.phone?.length !== 10;
    const checkIsEmpty = !values?.phone;
    const checkIsNumber = isNaN(parseInt(values?.phone));
    const validFormat = !/^\d+$/.test(values?.phone);
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
  };

  //Credit Score Validation
  //field greater than 0 less than 999
  //field can be left empty
  //field must be a string
  const [creditError, setCreditError] = useState(true);
  const [creditHelperText, setCreditHelperText] = useState('');

  const handleCreditValidation = (values) => {
    const checkGreaterThan = parseInt(values?.credit) > 999;
    const checkLessThan = parseInt(values?.credit) <= 0;
    const checkIsNumber = isNaN(parseInt(values?.credit));
    const checkIsEmpty = (!values?.credit);
    const validFormat = !/^\d+$/.test(values?.credit);
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

  //email validation
  // use "@" symbol and "."
  //field can't be empty
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const handleEmailValidation = (values) => {
    const email = values?.email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailHelperText('Please enter a valid email address')
    } else {
      setEmailError(false);
      setEmailHelperText('')
    }
  };

  //About me Multilinetext validation
  //can't exceed 500 characters
  const [aboutHelperText, setAboutHelperText] = useState("Max: 500 Characters");
  const [aboutError, setAboutError] = useState(false);

  const handleAboutValidation = (e) => {
    setValues(prevValue => ({
      ...prevValue, about: e.target.value
    }));
  }
  const checkValidity = (values) => {
    const length = values?.about?.split("").length
    if (length > 500) {
      setAboutError(true);
      setAboutHelperText(`Character limit reached. Delete ${length - 500} Characters`)
    } else {
      setAboutError(false);
      setAboutHelperText(`${length} / 500 Characters`)
    }
  }


  //Social media link valdiation
  //must follow a specific syntax
  const [link, setLink] = useState(false);
  const [LinkHelperText, setLinkHelperText] = useState('Optional');

  const handleLinkValidation = (e) => {
    const socialLink = e.target.value
    const linkRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    if (!linkRegex.test(socialLink)) {
      setLink(true);
      setLinkHelperText('Please enter a valid url')
    } else {
      setLink(false);
      setLinkHelperText('')
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
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleConversion(file, (result) => {
      return result;
    });
  }

  useEffect(() => {
    //console.log(values)
    handleCreditLogic(handleCreditValidation(values));
    handlePhoneLogic(handlePhoneValidation(values));
    handleEmailValidation(values);
    checkValidity(values);
    Object.keys(fieldError).forEach((value) => handleLocalError(value));
  }, [values]);


  //provides the default date for mui picker
  const [initialDate, setInitialDate] = useState(dayjs('2023-09-15T21:11:54'));


  return (
    <ValuesObjectContext.Provider value={{ values, setValues }}>
      <LinkValidationContext.Provider value={{ link, LinkHelperText, handleLinkValidation }}>
        <ImageValidationContext.Provider value={{ handleFileUpload }}>
          <BirthdayValidationContext.Provider value={{ birthday, handleBirthdayChange }}>
            <PhoneValidationContext.Provider value={{ phoneError, phoneHelperText }}>
              <CreditValidationContext.Provider value={{ creditError, creditHelperText }}>
                <EmailValidationContext.Provider value={{ emailError, emailHelperText }}>
                  <AboutValidationContext.Provider value={{ aboutHelperText, aboutError, handleAboutValidation }}>
                    <GlobalValidationContext.Provider value={{ globalError, fieldError, handleLocalError }}>
                      {children}
                    </GlobalValidationContext.Provider>
                  </AboutValidationContext.Provider>
                </EmailValidationContext.Provider>
              </CreditValidationContext.Provider>
            </PhoneValidationContext.Provider>
          </BirthdayValidationContext.Provider>
        </ImageValidationContext.Provider>
      </LinkValidationContext.Provider>
    </ValuesObjectContext.Provider >
  );
}

/*
      <ValidationProvider>
        <div className="info">
          <div className="ApplicationPage">
            <FormProgressBar steps={totalSteps} currentStep={page}>
              <div className="progressBar" style={progressBarStyles['.progressBar']}>
                <h5 className="1" style={progressBarStyles[`.${page + 1}`]}>(1) Background</h5>
                <h5 className="1" style={progressBarStyles[`.${page}`]}>(2) Uploads</h5>
                <h5 className="1" style={progressBarStyles[`.${page - 1}`]}>(3) LifeStyle</h5>
              </div>
            </FormProgressBar>
            <section className="ApplicationSubPage">
              {pages[page]}
            </section>
          </div>
        </div>
      </ValidationProvider>

*/