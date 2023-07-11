import {createContext} from "react";
import {createRequest, createProfile, deleteRequest, getProfiles, deleteProfile} from "../../api/index";
import {Profile} from "MapCardTypes";
import {AxiosResponse} from "axios";

type RequestHandleSubmit = (formData: Object) => Promise<void>
type ProfileHandleUpdate = (profile: Object) => Promise<AxiosResponse<any, any> | undefined>
type RequestHandleUpdate = (id: string, userRequestData: object) => Promise<AxiosResponse<any, any> | undefined>
type ProfileHandleRetrieval = (profileString: string) => Promise<AxiosResponse<any, any> | undefined>
type ProfileHandleSubmit = (data: Array<Profile>) => Promise<AxiosResponse<any, any>> | undefined

interface UserDataContextProps {
    requestHandleSubmit: RequestHandleSubmit
    profileHandleUpdate: ProfileHandleUpdate
    requestHandleUpdate: RequestHandleUpdate
    profileHandleRetrieval: ProfileHandleRetrieval
    profileHandleSubmit: ProfileHandleSubmit
}

const defaultUserDataContextProps = {
    requestHandleSubmit: async () => undefined,
    profileHandleUpdate: async () => undefined,
    requestHandleUpdate: async () => undefined,
    profileHandleRetrieval: async () => undefined,
    profileHandleSubmit: () => undefined
}
export const UserDataContext = createContext<UserDataContextProps>(defaultUserDataContextProps)
export default function UserDataProvider({children}: any) {

    const requestHandleSubmit: RequestHandleSubmit = async (formData) => {
        //record values in backend
        try {
            const response = await createRequest(formData);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }


    const profileHandleUpdate: ProfileHandleUpdate = async (profile) => {
        try {
            await deleteProfile()
            return createProfile(profile)
        } catch (error) {
            console.log(error)
        }
    }

    const requestHandleUpdate: RequestHandleUpdate = async (userRequestData) => {
        try {
            //superior method
            await deleteRequest()
            //const response = await createRequest(userRequestData)
            return createRequest(userRequestData);
            //console.log(response)
        } catch (error) {
            console.log(error)
        }

        /*
        try {
          const response = await updateRequest(id, formData)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
        */

    }

    const profileHandleRetrieval: ProfileHandleRetrieval = async (profileString) => {
        try {
            const response = await getProfiles(profileString)
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const profileHandleSubmit: ProfileHandleSubmit = (data) => {
        try {
            //const response = await createProfile(data);
            return createProfile(data);
            //console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <UserDataContext.Provider value={{
            profileHandleSubmit,
            profileHandleUpdate,
            requestHandleSubmit,
            requestHandleUpdate,
            profileHandleRetrieval
        }}>
            {children}
        </UserDataContext.Provider>
    )

}