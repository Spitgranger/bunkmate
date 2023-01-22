import './Applications.css'
import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { filledInputClasses } from '@mui/material';

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
          borderRadius: '30%'
        }}
        noValidate
        autoComplete="off"
      >
        <CssTextField id="filled-basic" label={props.firstField} variant="filled" size="small" />
        <CssTextField id="filled-basic" label={props.secondField} variant="filled" size="small" />
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
          id="filled-multiline-static"
          fullWidth
          placeholder='Tell Us a Bit About Yourself'
          label={props.field}
          multiline
          rows={4}
          variant="filled"
        />
      </div>
    </Box>
  </>)
}


function Sections(props) {
  return (
    <>
      <h2 className="profile">{props.title}
        {<IoIosInformationCircle size={22} />}
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
          <input value="Change Profile Picture" className="uploadPic" type="button"></input>

          <section className="form">

            <Inputs firstField="First Name" secondField="Last Name" />
            <section id="multiline">
              <MultiLineInput field="About Me" />
            </section>

            <Inputs firstField="Gender" secondField="Socials" />
            {/*student or work */}
            {/*(highschool, undergrad, grad, finished school)*/}
            <br />

            <section>
              <Sections title="Personal Info" message="
              *We collect this data for our algorithms, we won't share it with anyone else"
              />
              <Inputs firstField="Email" secondField="Birthday" />
              <Inputs firstField="Phone Number" secondField="Address" />
              {/*student or work */}
              {/*(highschool, undergrad, grad, finished school)*/}
              <br />
            </section>

            <section>
              <Sections title="Finances" message="*You can provide us proof later"
              />
              <Inputs firstField="Credit Score" secondField="Annual Income" />

            </section>
          </section>
        </section>
        <br />



      </div>
    </>
  )
}
export default Appliciation;