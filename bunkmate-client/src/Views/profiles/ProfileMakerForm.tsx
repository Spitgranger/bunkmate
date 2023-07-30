import {JSX, SyntheticEvent} from 'react'
import {
    DatePicker,
    FormSection,
    ActionButton,
    UploadFile,
    DropDownMenu,
    FormSingleLineInput,
    FormMultiLineInput,
    LineBox, NormalFormMultiLineInputWrapper,
} from '../../Utils/form.tsx';
import {IoChevronForward} from 'react-icons/io5';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import imageCompression from 'browser-image-compression';
import {useFormik} from "formik";
import {profileFormSchema} from './schemas'
import {InitialValuesType} from "./types/profileTypes.ts";

//everything below will be displayed within a modal window, this page is shown after signing up for an account
function ProfileMakerForm(): JSX.Element {

    const formik = useFormik({
        initialValues: {
            gender: "", birthday: "", about: "",
            sleepSchedule: "", education: "", smoking: "",
            drinking: "", cleanliness: "", toleratePets: "",
            havePets: "", tolerateGuests: "", cannabis: "",
            occupation: "", picture: ""
        },
        validationSchema: profileFormSchema,
        onSubmit: (
            values: InitialValuesType,
        ): void => {
            console.log(values)
        }
    })

    console.log(formik.values, formik.touched, formik.errors)

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


    //Todo
    const handleDateConversion = (dateValue: Date): void => {
        try {
            formik.setFieldValue('birthday', dateValue.toISOString().split('T')[0])
        } catch (error) {
            formik.setFieldValue('birthday', "")
            console.log("An error occurred during the date conversion: ", error)
        }
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

    const handleFileUpload = (e: SyntheticEvent): void => {
        const fileInput = e.target as HTMLInputElement
        if (fileInput.files && fileInput.files.length > 0) {
            handleConversion(fileInput.files[0], (base64String) => {
                formik.setFieldValue("picture", base64String)
            }).catch((error) => {
                    console.log("An error occurred while trying to convert profile picture to base64 string: ", error)
                }
            );
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
            //if the file uploaded is invalid then set picture field back to empty string
            await formik.setFieldValue("picture", "")
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
            accept={"image/jpeg,image/png,image/jpg"}
            endIcon={<CameraAltIcon
                sx={{color: "aqua"}}/>}
            handleFileUpload={handleFileUpload}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={"gender"}
                name={"gender"}
                label="Gender"
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.gender && formik.touched.gender}
                helperText={formik.touched.gender ? formik.errors.gender : ""}
                menuItem={["Male", "Female", "Other"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.gender}
            />,
            <DatePicker
                label="Birthday"
                disabled={false}
                required={true}
                value={formik.values.birthday}
                onBlur={formik.handleBlur}
                error={!!formik.errors.birthday && !formik.values.birthday}
                helperText={formik.values.birthday ? "" : formik.errors.birthday}
                onChange={(dateValue: Date) => {
                    handleDateConversion(dateValue);
                    console.log(formik.touched.birthday)
                }}
            />
        ]}/>
        <div id="multiline">
            <NormalFormMultiLineInputWrapper
                required={true}
                id="about"
                name="about"
                field="About Me"
                placeHolder="Tell us a bit about yourself"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.about && formik.touched.about}
                helperText={formik.touched.about ? formik.errors.about : ""}
                value={formik.values.about}
                disabled={false}
            />
        </div>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={'havePets'}
                name={'havePets'}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.havePets && formik.touched.havePets}
                helperText={formik.touched.havePets ? formik.errors.havePets : ""}
                label="Own Pets?"
                menuItem={["Yes", "No"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.havePets}
            />,

            <DropDownMenu
                id={'sleepSchedule'}
                name={'sleepSchedule'}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.sleepSchedule && formik.touched.sleepSchedule}
                helperText={formik.touched.sleepSchedule ? formik.errors.sleepSchedule : ""}
                label="Sleep Schedule"
                menuItem={["Early Bird", "Normal", "Night Owl"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.sleepSchedule}
            />,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={"cleanliness"}
                name={"cleanliness"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.cleanliness && formik.touched.cleanliness}
                helperText={formik.touched.cleanliness ? formik.errors.cleanliness : ""}
                label="Cleanliness"
                menuItem={["Not clean", "Clean", "Very Clean"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.cleanliness}
            />,
            <DropDownMenu
                id={"drinking"}
                name={"drinking"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.drinking && formik.touched.drinking}
                helperText={formik.touched.drinking ? formik.errors.drinking : ""}
                label="Drinking"
                menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.drinking}
            />,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={"smoking"}
                name={"smoking"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.smoking && formik.touched.smoking}
                helperText={formik.touched.smoking ? formik.errors.smoking : ""}
                label="Smoking"
                menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.smoking}
            />,
            <DropDownMenu
                id={"education"}
                name={"education"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.education && formik.touched.education}
                helperText={formik.touched.education ? formik.errors.education : ""}
                label="Current Education"
                menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.education}
            />,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={"cannabis"}
                name={"cannabis"}
                required={true}
                label="Cannabis"
                onBlur={formik.handleBlur}
                error={!!formik.errors.cannabis && formik.touched.cannabis}
                helperText={formik.touched.cannabis ? formik.errors.cannabis : ""}
                menuItem={["No Cannabis Use", "Light Cannabis Use", "Moderate Cannabis Use", "Heavy Cannabis User"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.cannabis}
            />,
            <FormSingleLineInput
                id={"occupation"}
                name={"occupation"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.occupation && formik.touched.occupation}
                helperText={formik.touched.occupation ? formik.errors.occupation : ""}
                size="small"
                type="text"
                field="Occupation"
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.occupation}
                placeHolder="ex. Student/Pharmacist"/>,
        ]}/>

        <LineBox flex={true} CssTextField={[
            <DropDownMenu
                id={"tolerateGuests"}
                name={"tolerateGuests"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.tolerateGuests && formik.touched.tolerateGuests}
                helperText={formik.touched.tolerateGuests ? formik.errors.tolerateGuests : ""}
                label="Ok With Guests?"
                menuItem={["Yes", "No"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.tolerateGuests}
            />,
            <DropDownMenu
                id={"toleratePets"}
                name={"toleratePets"}
                required={true}
                onBlur={formik.handleBlur}
                error={!!formik.errors.toleratePets && formik.touched.toleratePets}
                helperText={formik.touched.toleratePets ? formik.errors.toleratePets : ""}
                label="Ok With Pets?"
                menuItem={["Yes", "No"]}
                disabled={false}
                onChange={formik.handleChange}
                value={formik.values.toleratePets}
            />,
        ]}/>
        <ActionButton
            disabled={!(formik.dirty && formik.isValid)}
            fontSize="15px"
            width={"100%"}
            margin={"0px"}
            onClick={(e) => formik.handleSubmit(e)}
            type="submit"
            title="SUBMIT"
            endIcon={<IoChevronForward color="aqua"/>}/>
    </>)
}

export default ProfileMakerForm;