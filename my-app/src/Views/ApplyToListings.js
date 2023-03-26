import './ApplyToListings.css';
import Navbar from '../Components/Navbar';
import UploadsForm from '../Components/UploadsForm'
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
      <div style={{ height: '9vh' }} />
      <Navbar />
      <div className="info">
        <section className="ApplicationSubPage">
          <UploadsForm />
        </section>
      </div>
    </>
  )
}
export default ApplyToListings;