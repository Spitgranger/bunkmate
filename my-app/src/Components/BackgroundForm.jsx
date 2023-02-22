import { useState, useRef, useEffect, useContext, useMemo, useCallback } from 'react'
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
import {

  LinkValidationContext,
  ValuesObjectContext,
  ImageValidationContext,
  BirthdayValidationContext,
  GlobalValidationContext,
  PhoneValidationContext,
  CreditValidationContext,
  AboutValidationContext,
  EmailValidationContext,

} from './GlobalStateManagement/ValidationContext';

import { createProfile } from '../api';

const handleSubmit = async (data) => {
  try {
    const response = await createProfile(data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}

function Background({ forwardButton }) {

  const { link, LinkHelperText, handleLinkValidation } = useContext(LinkValidationContext)
  const { values, setValues } = useContext(ValuesObjectContext)
  const handleFileUpload = useContext(ImageValidationContext)
  const { birthday, handleBirthdayChange } = useContext(BirthdayValidationContext)
  const globalError = useContext(GlobalValidationContext)
  const { phoneError, phoneHelperText } = useContext(PhoneValidationContext)
  const { creditError, creditHelperText } = useContext(CreditValidationContext)
  const { emailError, emailHelperText } = useContext(EmailValidationContext)
  const { aboutError, aboutHelperText, handleAboutValidation } = useContext(AboutValidationContext)


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

  const handleFieldChange = (e, field) => {
    setValues(prevValue => ({ ...prevValue, [field]: e.target.value }));
  };

  return (<>


    <FormSection title="Profile"
      message="*Everything in this section will be visible to other people"
    />
    <div style={{ display: 'flex', justifyContent: 'center', borderRadius: "90px" }}>
      {values?.picture ? <img src={values.picture} style={{ width: "100px", height: "100px", borderRadius: "50px" }}></img> : null}
    </div>
    <UploadFile helperText="Supported Files: jpg, png" helperTextPos="45%" width="50%" type="file" message="Upload Profile Picture" accept={["image/jpg", "image/jpeg", "image/png"]} endIcon={<CameraAltIcon sx={{ color: "aqua" }} />} handleFileUpload={handleFileUpload} />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size='small' type="text" field="Legal First Name" placeHolder="Sam" onChange={(e) => { handleFieldChange(e, 'firstName'); }} value={values?.firstName} />,
      <FormSingleLineInput size="small" type="text" field="Legal Last Name" placeHolder="Jenkins" onChange={(e) => { handleFieldChange(e, 'lastName'); }} value={values?.lastName} />,]
    } />
    <div id="multiline">
      <FormMultiLineInput placeHolder="Tell us a bit about yourself" type="text" field="About Me" helperText={aboutHelperText} onChange={(e) => { handleAboutValidation(e); }} error={aboutError} value={values?.about} />
    </div>

    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Gender" menuItem={["Male", "Female", "Other"]} value={values?.gender} onChange={(e) => { handleFieldChange(e, 'gender'); }} />,
      <FormSingleLineInput error={link} helperText={LinkHelperText} onChange={(e) => { handleFieldChange(e, 'links'); handleLinkValidation(e); }} size="small" type="text" field="Social Media Profile" placeHolder="ex. https://www.linktr.ee/john_smith" value={values?.links} />
    ]
    } />
    <br></br>

    <FormSection title="Personal Info" message="*We collect this data for our algorithms, we won't share it with anyone else. We'll ask you for proof on the next page" />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" error={emailError} helperText={emailHelperText} value={values?.email} onChange={(e) => { handleFieldChange(e, 'email'); }} />,
      <DatePicker label="Birthday" value={birthday} onChange={handleBirthdayChange} />
    ]
    } />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput type="text" size="small" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" error={phoneError} onChange={(e) => { handleFieldChange(e, 'phone'); }} value={values?.phone} />,
      <FormSingleLineAddressInput type="text" field="Address" placeHolder="31 West Street" inputRef={inputRef} value={values?.address} onChange={(e) => { handleFieldChange(e, 'address'); }} />
    ]
    } />
    {values.city && values.country && values.province ?
      <LineBox flex={true} CssTextField={[
        <FormSingleLineInput size="small" type="text" field="City" placeHolder="New York" value={values?.city} />,
        <FormSingleLineInput size="small" type="text" field="Country" placeHolder="United States" value={values?.country} />,
        <FormSingleLineInput size="small" type="text" field="Province/State" placeHolder="Ontario" value={values?.province} />
      ]
      } /> : null}
    <LineBox flex={true} CssTextField={[
      <DropDownMenu label="Employment Status" menuItem={["Currently Employed", "Currently Unemployed", "Currently Self Employed"]} value={values?.employment} onChange={(e) => { handleFieldChange(e, "employment"); }} />,
      <DropDownMenu label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} value={values?.education} onChange={(e) => { handleFieldChange(e, 'education'); }} />,
    ]
    } />
    <br></br>
    <FormSection title="Finances and Verification" message="*You can provide us proof later" />
    {/* ranges from 10000 - 100000*/}
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput size="small" helperText={creditHelperText} error={creditError} field="Credit Score" placeHolder="ex. 740" value={values?.credit} onChange={(e) => { handleFieldChange(e, 'credit'); }} />,
      <DropDownMenu default={""} label="Annual Income" menuItem={["< $10000", "$10000 - $50000", "$50001 - $100000", "$100001 - $200000", "> $200001"]} value={values?.income} onChange={(e) => { handleFieldChange(e, 'income'); }} />,
    ]
    } />

    <ActionButton disabled={globalError} fontSize="15px" width="100%" onClick={() => { handleSubmit(values); forwardButton(); localStorage.setItem("page1", JSON.stringify(values)); }} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default Background;