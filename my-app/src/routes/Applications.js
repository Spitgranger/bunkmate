import './Applications.css';
import Navbar from '../Components/Navbar';
import Background from '../Components/BackgroundForm'
import Uploads from '../Components/UploadsForm'
import Lifestyle from '../Components/LifestyleForm'
import { FormProgressBar } from '../Components/SubComponents/Form'
import { useState } from 'react'


function Appliciation() {

  /* sets the subpage of the form that you're on 
  also controls progress bar*/
  const [page, setpage] = useState(0);

  const totalSteps = 2

  function handleContinueClick() {
    setpage(() => page + 1)
  }
  function handleBackClick() {
    setpage(() => page - 1)
  }

  const pages = [
    <Background forwardButton={handleContinueClick} />,
    <Uploads
      backwardButton={handleBackClick}
      forwardButton={handleContinueClick}
    />,
    <Lifestyle
      backwardButton={handleBackClick}
      forwardButton={handleContinueClick}
    />,
  ]

  const progressBarStyles = {
    '.progressBar': {
      display: 'flex',
      justifyContent: 'space-between',
      flexFlow: 'row nowrap',
    },

    '.progressBar >*': {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    '.1': {
      color: '#0eb8be',
    },

  }

  return (
    <>
      <Navbar />
      <div className="info">
        <div className="page">
          <FormProgressBar steps={totalSteps} currentStep={page}>
            <div className="progressBar" style={progressBarStyles['.progressBar']}>
              <h5 className="1" style={progressBarStyles[`.${page + 1}`]}>(1) Background</h5>
              <h5 className="1" style={progressBarStyles[`.${page}`]}>(2) Uploads</h5>
              <h5 className="1" style={progressBarStyles[`.${page - 1}`]}>(3) LifeStyle</h5>
            </div>
          </FormProgressBar>
          <section className="subPage">
            {pages[page]}
          </section>
        </div>



      </div>
    </>
  )
}
export default Appliciation;