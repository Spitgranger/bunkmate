import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import CreatePost from './Views/CreatePost';
import ApplyToListings from './Views/ApplyToListings';
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
import { OtherProfile } from './Views/OtherProfile';
import { Provider } from 'react-redux';
import store from './store/index'
import { configureStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

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
                    <App />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />,
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
                    <Profile />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />,
  },
  {
    path: "/apply_to_listings",
    element:
      <BunkmateProvider>
        <UserDataProvider>
          <FormatProvider>
            <MessageProvider>
              <SignInProvider>
                <ValidationProvider>
                  <Provider store={store}>
                    <ApplyToListings />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />,
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
                    <Bunkmates />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />
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
                    <Messages />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />
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
                    <OtherProfile />
                  </Provider>
                </ValidationProvider>
              </SignInProvider>
            </MessageProvider>
          </FormatProvider>
        </UserDataProvider>
      </BunkmateProvider>,
    errorElement: <Error />
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
                    <Error404 />
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
