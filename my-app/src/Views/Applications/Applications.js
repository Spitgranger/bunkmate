import './Applications.css';
import Navbar from '../../Components/Navbar';
import UploadsForm from '../../Components/UploadsForm'
import { useState } from 'react'
import { CardContent, Card, Typography, } from '@mui/material';

function Applications() {

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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <CardContent sx={{ display: 'flex', width: '65vw', justifyContent: 'center' }}>
          <Typography variant="h4" color="text.primary">
            Summary
          </Typography>
        </CardContent>
        <CardContent sx={{ display: 'flex', width: '65vw', justifyContent: 'center' }}>
          <Typography variant="h4" color="text.primary">
            sdofijs
          </Typography>
        </CardContent>
      </div>

    </>
  )
}
export default Applications;