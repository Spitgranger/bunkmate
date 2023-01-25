import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from './routes/CreatePost';
import Applications from './routes/Applications';
import SignIn from './routes/SignIn';
import Error from './Error';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/create",
    element: <CreatePost />,
    errorElement: <Error />,
  },
  {
    path: "/applications",
    element: <Applications />,
    errorElement: <Error />,
  },
  {
    path: "/signin",
    element: <SignIn/>,
    errorElement: <Error />,
  }
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
