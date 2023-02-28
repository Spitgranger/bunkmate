import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from './routes/CreatePost';
import ApplyToListings from './routes/ApplyToListings';
import Error from './Error';
import Social from './routes/Social';
import Messages from './routes/Messages'
import Profile from './routes/Profile';
import SignInProvider from './Components/GlobalStateManagement/SignInContext';
import ValidationProvider from './Components/GlobalStateManagement/ValidationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <SignInProvider>
        <ValidationProvider>
          <App />,
        </ValidationProvider>
      </SignInProvider>,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element:
      <SignInProvider>
        <ValidationProvider>
          <Profile />,
        </ValidationProvider>
      </SignInProvider>,
    errorElement: <Error />,
  },
  {
    path: "/apply_to_listings",
    element:
      <SignInProvider>
        <ValidationProvider>
          <ApplyToListings />,
        </ValidationProvider>
      </SignInProvider>,
    errorElement: <Error />,
  },
  {
    path: '/bunkmates',
    element:
      <SignInProvider>
        <ValidationProvider>
          <Social />,
        </ValidationProvider>
      </SignInProvider>,
    errorElement: <Error />
  },
  {
    path: '/messages',
    element:
      <SignInProvider>
        <ValidationProvider>
          <Messages />,
        </ValidationProvider>
      </SignInProvider>,
    errorElement: <Error />
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
