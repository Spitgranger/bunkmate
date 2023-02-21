import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from './routes/CreatePost';
import Applications from './routes/Applications';
import Error from './Error';
import Social from './routes/Social';
import Messages from './routes/Messages'
import Profile from './routes/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/applications",
    element: <Applications />,
    errorElement: <Error />,
  },
  {
    path: '/bunkmates',
    element: <Social />,
    errorElement: <Error />
  },
  {
    path: '/messages',
    element: <Messages />,
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
