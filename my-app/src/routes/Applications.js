import './Applications.css';
import Navbar from '../Components/Navbar';
import Background from '../Components/BackgroundForm'
import Uploads from '../Components/UploadsForm'
import { useState } from 'react'
function Appliciation() {

  /* sets the subpage of the form that you're on */
  const [page, setpage] = useState(0);

  function handleContinueClick() {
    return (setpage(() => page + 1));
  }
  function handleBackClick() {
    return (setpage(() => page - 1));
  }
  const pages = [
    <Background forwardButton={handleContinueClick} />,
    <Uploads
      backwardButton={handleBackClick}
      forwardButton={handleContinueClick}
    />,
  ]
  return (
    <>
      <Navbar />
      <div className="info">
        <section className="section">
          {pages[page]}
        </section>



      </div>
    </>
  )
}
export default Appliciation;