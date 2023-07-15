import {JSX, useContext, SyntheticEvent, useState} from 'react'
import {
    DatePicker,
    FormSection,
    ActionButton,
    UploadFile,
    DropDownMenu,
    FormSingleLineInput,
    FormMultiLineInput,
    LineBox,
} from '../../Utils/form.tsx';
import {IoChevronForward} from 'react-icons/io5';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {SignInContext} from '../../globalContext/SignInContext.tsx';
import imageCompression from 'browser-image-compression';
import {DateType} from '../../Utils/types'


//styles
/*const backButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px'
}*/


//everything below will be displayed within a modal window, this page is shown after signing up for an account
function ProfileMakerForm(): JSX.Element {

    const {setIsOpen} = useContext(SignInContext)
    //const {profileHandleSubmit, profileHandleUpdate} = useContext(UserDataContext)
    //const reduxDispatch = useAppDispatch()

    //function to handle fetching the profile data from back end
    /*
    const handleProfile = async () => {
        try {
            return await getProfile();
        } catch (error) {
            console.log(error)
        }
    };*/

    const [fields, setFields] = useState<{ [key: string]: DateType }>({})
    type HandleRecordField = (value: DateType, field: string) => void

    const handleRecordField: HandleRecordField = (value, field) => {
        const recordedFields = {...fields}
        recordedFields[field] = value
        setFields(recordedFields)
    }


    //get data from backend when the component first loads works


    /*
    const handleSubmit = (values) => {
        //re-renders the useEffect which fetches info from backend in profile.ts
        //if user already has a profile then update it else submit it
        if (userProfile) {
            profileHandleUpdate(values).then(() => {
                reduxDispatch(setRerender())
            })
        } else {
            profileHandleSubmit(values).then(() => {
                reduxDispatch(setRerender())
            })
        }
    }
     */

    //special handle event function just to file uploads
    const handleFileUpload = (e: SyntheticEvent): void => {
        const fileInput = e.target as HTMLInputElement
        if (fileInput.files && fileInput.files.length > 0) {
            handleConversion(fileInput.files[0], (base64String) => {
                console.log(base64String)
            }).catch((error) => console.log(error));
        }
    }

    //converts image + compresses to base64-encoded string
    const handleConversion = async (file: File, callback: (base64String: ArrayBuffer | string | null) => void): Promise<void> => {
        let compressedFile
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
        }

        try {
            compressedFile = await imageCompression(file, options);
            console.log(compressedFile.size / 1024 / 1024);
        } catch (error) {
            console.log(error)
            return
        }

        let reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = function (): void {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log("An error has occurred during the file conversion", error)
        };
    }

    //handle going back to the previous page
    /*const BackButton = () => {
        return (
            <label style={{cursor: 'pointer'}}>
                <input style={{display: 'none'}} onClick={backwardButton} type="button"/>
                <h3 style={backButtonStyles}>
                    <IoChevronBack/>Back
                </h3>
            </label>)
    }*/

    //handle closing the modal window
    const handleClose = () => {
        setIsOpen(false)
    }


    return (<>
        <FormSection title="My Profile"
                     message="*Everything in this section will be visible to other people. Don't worry you can always change it later"
        />
        <div style={{display: 'flex', justifyContent: 'center', borderRadius: "90px"}}>
            {/* profile picture */}
            {/*state?.values?.picture ? <img src={state?.values?.picture} style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px"
            }}></img> : null*/}
        </div>
        <UploadFile
            helperText="Supported Files: jpg, png"
            helperTextPos="45%"
            width="50%"
            type="file"
            message="Upload Picture"
            accept={["image/jpg", "image/jpeg", "image/png"]}
            endIcon={<CameraAltIcon
                sx={{color: "aqua"}}/>}
            handleFileUpload={handleFileUpload}/>
        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                required="true"
                label="Gender"
                menuItem={["Male", "Female", "Other"]}/>,
            <DatePicker
                label="Birthday"
                disabled={false}
                required={true}
                onChange={(value: DateType) => handleRecordField(value, "birthday")}/>,
        ]}/>
        <div id="multiline">
            <FormMultiLineInput required="true" placeHolder="Tell us a bit about yourself" type="text"
                                field="About Me"/>
        </div>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu required="true"
                          label="Own pets?"
                          menuItem={["Yes", "No"]}/>,
            <DropDownMenu required="true"
                          label="Sleep Schedule"
                          menuItem={["Early Bird", "Normal", "Night Owl"]}/>,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu required="true"
                          label="Cleanliness"
                          menuItem={["Not clean", "Clean", "Very Clean"]}/>,
            <DropDownMenu required="true"
                          label="Drinking"
                          menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]}/>,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu required="true"
                          label="Smoking"
                          menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]}/>,
            <DropDownMenu required="true"
                          label="Current Education"
                          menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]}/>,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu required="true"
                          label="Cannabis"
                          menuItem={["No Cannabis Use", "Light Cannabis Use", "Moderate Cannabis Use", "Heavy Cannabis User"]}/>,
            <FormSingleLineInput required="true"
                                 size="small"
                                 type="text"
                                 field="Occupation" placeHolder="ex. Student/Pharmacist"/>,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu required="true"
                          label="Ok with guests?"
                          menuItem={["Yes", "No"]}/>,
            <DropDownMenu required="true"
                          label="Ok with pets?"
                          menuItem={["Yes", "No"]}/>,
        ]}/>


        <ActionButton
            disabled={false}
            fontSize="15px"
            width="100%"
            onClick={() => {
                /*handleSubmit(state?.values);*/
                handleClose();
                /*localStorage.setItem("page1", JSON.stringify(values));*/
            }} type="submit" title="SUBMIT" endIcon={<IoChevronForward color="aqua"/>}/>
    </>)
}

export default ProfileMakerForm;