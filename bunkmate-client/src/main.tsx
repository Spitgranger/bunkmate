import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from './Error';
import Error404 from "./Error404.tsx";
import Bunkmates from './Views/Bunkmates/Bunkmates';
import Profile from './Views/profiles/MyProfile.tsx';
import SignInProvider from './Components/GlobalStateManagement/SignInContext';
import ValidationProvider from './Components/GlobalStateManagement/ValidationContext';
import FormatProvider from './Components/GlobalStateManagement/FormatContext';
import UserDataProvider from './Components/GlobalStateManagement/UserDataContext'
import {OtherProfile} from './Views/profiles/OtherProfile.tsx';
import {Provider} from 'react-redux';
import Navbar from "./Views/navigation/Navbar";
import store from './store'

const getRoot: HTMLElement | null = document.getElementById("root")
if (getRoot) {
    const root = ReactDOM.createRoot(getRoot);
    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <App/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>,
            errorElement: <Error/>,
        },
        {
            path: "/profile",
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <Profile/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>,
            errorElement: <Error/>,
        },
        {
            path: '/bunkmates',
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar chooseStyle={"glass"}/>
                                    <Bunkmates/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>,
            errorElement: <Error/>
        },
        {
            path: '/messages',
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>,
            errorElement: <Error/>
        },
        {
            path: '/otherprofile',
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <OtherProfile/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>,
            errorElement: <Error/>
        },
        {
            path: '*',
            element:
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar chooseStyle={"glass"}/>
                                    <Error404/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>
        },

    ]);


    root.render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );
}