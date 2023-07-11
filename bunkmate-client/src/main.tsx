import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Applications from './Views/applications/applications';
import Error from './Error';
import Error404 from './Error404'
import Bunkmates from './Views/Bunkmates/Bunkmates';
import Profile from './Views/MyProfile';
import SignInProvider from './Components/GlobalStateManagement/SignInContext';
import ValidationProvider from './Components/GlobalStateManagement/ValidationContext';
import FormatProvider from './Components/GlobalStateManagement/FormatContext';
import BunkmateProvider from './Components/GlobalStateManagement/BunkmatesContext'
import UserDataProvider from './Components/GlobalStateManagement/UserDataContext'
import {OtherProfile} from './Views/OtherProfile';
import {Provider} from 'react-redux';
import L1Details from './Views/listings/l1Details'
import L2Details from './Views/listings/l2Details';
import Navbar from "./Views/navigation/Navbar";
import store from './store/index'
import {ChakraProvider} from "@chakra-ui/react";
import Messages from "./Views/Messages/Messages.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element:
            <BunkmateProvider>
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
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>,
    },
    {
        path: "/profile",
        element:
            <BunkmateProvider>
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
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>,
    },
    {
        path: "/applications",
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <Applications/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>,
    },
    {
        path: '/bunkmates',
        element:
            <BunkmateProvider>
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
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '/messages',
        element:
            <ChakraProvider>

                <Provider store={store}>
                    <Messages/>
                </Provider>

            </ChakraProvider>,
        errorElement: <Error/>
    },
    {
        path: '/otherprofile',
        element:
            <BunkmateProvider>
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
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '/l1details',
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <L1Details/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '/l2details',
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <SignInProvider>
                            <ValidationProvider>
                                <Provider store={store}>
                                    <Navbar/>
                                    <L2Details/>
                                </Provider>
                            </ValidationProvider>
                        </SignInProvider>
                    </FormatProvider>
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '*',
        element:
            <BunkmateProvider>
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
            </BunkmateProvider>,
    },

]);


root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
