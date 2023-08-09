import * as yup from "yup";

const fieldRequiredMsg = "* Required"
export const profileFormSchema = yup.object().shape({
    gender: yup.string().required(fieldRequiredMsg),
    birthday: yup.string().required("Please enter a valid date"),
    about: yup
        .string()
        .min(100, "Please enter a minimum of 100 characters")
        .max(500, "Limit is 500 characters")
        .required(fieldRequiredMsg),
    sleepSchedule: yup.string().required(fieldRequiredMsg),
    education: yup.string().required(fieldRequiredMsg),
    smoking: yup.string().required(fieldRequiredMsg),
    drinking: yup.string().required(fieldRequiredMsg),
    cleanliness: yup.string().required(fieldRequiredMsg),
    toleratePets: yup.string().required(fieldRequiredMsg),
    havePets: yup.string().required(fieldRequiredMsg),
    tolerateGuests: yup.string().required(fieldRequiredMsg),
    cannabis: yup.string().required(fieldRequiredMsg),
    occupation: yup.string().required(fieldRequiredMsg),
    picture: yup.string().required(fieldRequiredMsg),
    instagram: yup.string(),
    facebook: yup.string(),
    linkedin: yup.string(),
    twitter: yup.string(),

})
