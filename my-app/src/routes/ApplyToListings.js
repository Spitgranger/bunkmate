import './ApplyToListings.css';
import Navbar from '../Components/Navbar';
import Uploads from '../Components/UploadsForm'
import { useState, createContext } from 'react'
import ValidationProvider from '../Components/GlobalStateManagement/ValidationContext'
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';

function ApplyToListings() {

  /* sets the subpage of the form that you're on 
  also controls progress bar*/
  const [page, setpage] = useState(0);

  function handleContinueClick() {
    setpage(() => page + 1)
  }



  return (
    <>
      <SignInProvider>
        <Navbar />
      </SignInProvider >
      <ValidationProvider>
        <div className="info">
          <section className="ApplicationSubPage">
            <Uploads
              forwardButton={handleContinueClick}
            />,
          </section>
        </div>
      </ValidationProvider>
    </>
  )
}
export default ApplyToListings;