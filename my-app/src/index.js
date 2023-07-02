import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Applications from './Views/applications/applications';
import Error from './Error';
import Error404 from './Error404'
import Bunkmates from './Views/Bunkmates/Bunkmates';
import Messages from './Views/Messages/Messages'
import Profile from './Views/MyProfile';
import SignInProvider from './Components/GlobalStateManagement/SignInContext';
import ValidationProvider from './Components/GlobalStateManagement/ValidationContext';
import MessageProvider from './Components/GlobalStateManagement/MessageContext';
import FormatProvider from './Components/GlobalStateManagement/FormatContext';
import BunkmateProvider from './Components/GlobalStateManagement/BunkmatesContext'
import UserDataProvider from './Components/GlobalStateManagement/UserDataContext'
import {OtherProfile} from './Views/OtherProfile';
import {Provider} from 'react-redux';
import L1Details from './Views/listings/l1Details'
import L2Details from './Views/listings/l2Details';
import Navbar from "./Views/navigation/Navbar";
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <App/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Navbar/>
                                        <Profile/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Applications/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Navbar chooseStyle={"glass"}/>
                                        <Bunkmates/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
                    </FormatProvider>
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '/messages',
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Navbar/>
                                        <Messages/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
                    </FormatProvider>
                </UserDataProvider>
            </BunkmateProvider>,
        errorElement: <Error/>
    },
    {
        path: '/otherprofile',
        element:
            <BunkmateProvider>
                <UserDataProvider>
                    <FormatProvider>
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Navbar/>
                                        <OtherProfile/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <L1Details/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <L2Details/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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
                        <MessageProvider>
                            <SignInProvider>
                                <ValidationProvider>
                                    <Provider store={store}>
                                        <Error404/>
                                    </Provider>
                                </ValidationProvider>
                            </SignInProvider>
                        </MessageProvider>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
