import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getProfile} from "../../api";

const initialState = {
    profile: {
        /**@readonly - For mongo db*/
        __v: 0,
        /**@readonly - backend id*/
        _id: "",
        /**User's Biography*/
        about: "",
        /**User's address*/
        address: "",
        /**age of the user*/
        age: "",
        /** @readonly - Birthday of the user*/
        birthday: "",
        /**Smokes cannabis yes or no*/
        cannabis: "",
        /**City the user currently lives in*/
        city: "",
        /**The rated cleanliness level of the user*/
        cleanliness: "",
        /**The country the user currently resides in*/
        country: "",
        /**Light, Moderate, Heavy Drinker*/
        drinking: "",
        /**Highest education level so far*/
        education: "",
        /**Email used to sign up for the account*/
        email: "",
        /**is user currently employed yes or no*/
        employment: "",
        /**User's First name*/
        firstName: "",
        /**User's gender*/
        gender: "",
        /**Does the user have pets*/
        havePets: "",
        /**User's Last name*/
        lastName: "",
        /**Current occupation if none then student*/
        occupation: "",
        /**User's phone number*/
        phone: "",
        /**base64 string user avatar*/
        picture: "",
        /**Province the user currently resides in*/
        province: "",
        /** early bird, normal, night owl*/
        sleepSchedule: "",
        /** Does the user smoke yes or no*/
        smoking: "",
        /** Does the user tolerate guests yes or no*/
        tolerateGuests: "",
        /** Does the user tolerate pets yes or no*/
        toleratePets: "",
        /**user Id*/
        user: "",
    },
    error: false,
}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})
/**@description Redux slice and reducers that handle user profile state*/
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //case where the promise is fulfilled; profile is fetched with no issues
        builder.addCase(fetchProfile.fulfilled, (_, action) => {
            return action.payload
        })
            //case where promise is rejected, profile is not fetched successfully
            .addCase(fetchProfile.rejected, (state) => {
                return {...state, error: true}
            })
   }
})

export default profileSlice.reducer