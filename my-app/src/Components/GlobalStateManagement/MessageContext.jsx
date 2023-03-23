import { useState, createContext, useEffect } from 'react';
import { useClient } from '../../Views/Messages/hooks/useClient';
import { getProfile } from '../../api';

export const chatClientContext = createContext(null)

export default function MessageProvider({ children }) {

  const localStorageData = JSON.parse(localStorage.getItem('profile'));
  function GetClientInfo() {

    const [userProfile, setUserProfile] = useState("");

    //Used to handle retrieving user data from api
    const handleProfile = async () => {
      const profile = await getProfile();
      return profile
    }

    //get data from backend when the component first loads works
    useEffect(() => {
      handleProfile().then((profile) => setUserProfile(profile.data)).catch(error => console.log(error))
    }, []);

    const user = {
      id: localStorageData?.result?._id,
      name: userProfile?.firstName,
      //doesn't work
      //image: userProfile?.picture
      image: 'https://picsum.photos/200/300'

    };

    const userToken = localStorageData?.streamToken
    const apiKey = process.env.REACT_APP_STREAM_API_KEY;


    const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });



    //controls the state of the chatClient object that stores a lot of useful data on users and channels
    return chatClient

  }


  return (
    //might have to do connect user from here becuase the user might not have necessarily opened up the message yet
    <chatClientContext.Provider value={{ GetClientInfo, localStorageData }}>
      {children}
    </chatClientContext.Provider>

  )

}