import './Applications.css'
import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#2fd0d8',
  },
  '& label.Mui-underline:after': {
    borderBottomColor: '#2fd0d8',
  },
});

function Inputs(props) {
  return (
    <section className="line">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <CssTextField id="outlined-basic" label={props.firstField} variant="outlined" size="small" placeholder={props.placeHolder1}/>
        <CssTextField id="outlined-basic" label={props.secondField} variant="outlined" size="small" placeholder={props.placeHolder2} />
      </Box>
    </section>
  );
}

function MultiLineInput(props) {
  return (<>
    <Box
      component="form"
      sx={{
        width: '100%',
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <CssTextField
          id="outlined-multiline-static"
          fullWidth
          placeholder='Tell Us a Bit About Yourself'
          label={props.field}
          multiline
          rows={4}
          variant="outlined"
        />
      </div>
    </Box>
  </>)
}


function Sections(props) {
  return (
    <>
      <h2 className="profile">{props.title}
      </h2>
      <h5>
        <i>
          {/* TODO when someone clicks on an input this pops up */}
          {props.message}
        </i>
      </h5>
    </>
  )
}

function Appliciation() {
  return (
    <>
      <Navbar />
      <div className="info">
        <section className="section">
          <Sections title="Profile" message="
            *Everything in this section will be visible to other people"
          />
          <label className="uploadPic">
          <Button variant="contained" sx={{backgroundColor: "black", color: 'white', borderRadius: "10px", width: '360px', height: '60px' }}>
                <input accept="image/*" className={"uploadButton"} id="icon-button-file" type="file" />
                      <label htmlFor="icon-button-file">
                        <IconButton sx={{color: "aqua"}} aria-label="upload picture" component="span">
                          <CameraAltIcon />
                        </IconButton>
                      </label>
                Upload Profile Picture
              </Button>
            </label>



          <section className="form">

            <Inputs firstField="First Name" secondField="Last Name" />
            <section id="multiline">
              <MultiLineInput field="About Me" />
            </section>

            <Inputs firstField="Gender" secondField="Socials" placeHolder2="ex. www.linkedin.com" />
            {/*student or work */}
            {/*(highschool, undergrad, grad, finished school)*/}
            <br />
            <hr 
            color="grey"
            width="100%"
            size="1">
            </hr>

            <section>
              <Sections title="Personal Info" message="
              *We collect this data for our algorithms, we won't share it with anyone else"
              />
              <Inputs firstField="Email" secondField="Birthday" placeHolder2="mm/dd/year" />
              <Inputs firstField="Phone Number" secondField="Address" />
              {/*student or work */}
              {/*(highschool, undergrad, grad, finished school)*/}
            </section>
            <br />
            <hr 
            color="grey"
            width="100%"
            size="1">
            </hr>

            <section>
              <Sections title="Finances" message="*You can provide us proof later"
              />
              <Inputs firstField="Credit Score" secondField="Annual Income" />

            </section>
          </section>
        <div className="continueButton">
          <Button variant="contained" sx={{backgroundColor: "black", color: 'white', borderRadius: "10px", width: '180px', height: '60px' }}>Continue</Button>
        </div>
        </section>



      </div>
    </>
  )
}
export default Appliciation;