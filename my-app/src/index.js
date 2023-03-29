import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from './Views/CreatePost';
import ApplyToListings from './Views/ApplyToListings';
import Error from './Error';
import Error404 from './Error404'
import Bunkmates from './Views/Bunkmates/Bunkmates';
import Messages from './Views/Messages/Messages'
import Profile from './Views/Profile';
import SignInProvider from './Components/GlobalStateManagement/SignInContext';
import ValidationProvider from './Components/GlobalStateManagement/ValidationContext';
import MessageProvider from './Components/GlobalStateManagement/MessageContext';
import FormatProvider from './Components/GlobalStateManagement/FormatContext';
import MapProvider from './Components/GlobalStateManagement/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <MapProvider>
        <FormatProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <App />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </FormatProvider>
      </MapProvider>,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element:
      <MapProvider>
        <FormatProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <Profile />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </FormatProvider>
      </MapProvider>,
    errorElement: <Error />,
  },
  {
    path: "/apply_to_listings",
    element:
      <MapProvider>
        <FormatProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <ApplyToListings />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </FormatProvider>
      </MapProvider>,
    errorElement: <Error />,
  },
  {
    path: '/bunkmates',
    element:
      <MapProvider>
        <FormatProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <Bunkmates />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </FormatProvider>
      </MapProvider>,
    errorElement: <Error />
  },
  {
    path: '/messages',
    element:
      <FormatProvider>
        <MapProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <Messages />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </MapProvider>
      </FormatProvider>,
    errorElement: <Error />
  },
  {
    path: '*',
    element:
      <MapProvider>
        <FormatProvider>
          <MessageProvider>
            <SignInProvider>
              <ValidationProvider>
                <Error404 />
              </ValidationProvider>
            </SignInProvider>
          </MessageProvider>
        </FormatProvider>
      </MapProvider >,
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
