import './ApplyToListings.css';
import Navbar from '../Components/Navbar';
import UploadsForm from '../Components/UploadsForm'
import ProfileMakerForm from '../Components/ProfileMakerForm'
import CreateRequestForm from '../Components/CreateRequestForm'
import { useState, createContext } from 'react'

function ApplyToListings() {

  /* sets the subpage of the form that you're on 
  also controls progress bar*/
  const [page, setpage] = useState(0);

  function handleContinueClick() {
    setpage(() => page + 1)
  }

  return (
    <>
      <Navbar />
      <div className="info">
        <section className="ApplicationSubPage">
          <UploadsForm />
          <ProfileMakerForm />
        </section>
      </div>
    </>
  )
}
export default ApplyToListings;