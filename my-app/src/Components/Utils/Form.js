import "./Form.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MenuList from "@mui/material/MenuList";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText, InputAdornment, Typography } from "@mui/material";
import { useState, memo, useCallback } from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import dayjs from 'dayjs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function MultipleSelectCheckmarks({ value, helperText, title, menuItems, required, onChange }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const { target: { value }, } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <FormControl size="small" >
      <InputLabel id="multiple-checkbox-label" required={required}>{title}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={value || personName}
        onChange={(event) => { handleChange(event); onChange(event); }}
        input={<OutlinedInput sx={{ width: '100%', maxWidth: 400 }} label={title} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {menuItems?.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <Typography noWrap>
              {name}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export function DatePicker({ label, onChange, value, required, disabled }) {
  /*
  const [initialDate, setInitialDate] = React.useState(dayjs('2022-09-15T21:11:54'));

  const handleChange = (newValue) => {
    setInitialDate(newValue);
  };
  */

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={onChange}
          disabled={disabled}
          renderInput={(params) => <TextField {...params} size="small" required={required} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export function LineBox({ flex, CssTextField }) {
  const check = flex ? 1 : null; //if true then make use flex: 1 else: use flex null
  return (
    <Box
      component="form"
      id="line"
      sx={{
        '& > :not(style)': { m: 1, flex: check, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      {CssTextField.map(textField => {
        return (textField);
      })}
    </Box>
  );
}

/*
fuck this useless complex syntax

const CssTextField = styled(TextField)({
  '& label': {
    color: '#5c5c5c',
  },

  '& label.Mui-focused': {
    color: '#2497b7'
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: '#2497b7',
    }
  }
});

*/

export function DropDownMenu({ disabled, helperText, required, autoFocus, inputRef, defaultValue, value, onChange, label, menuItem, maxHeight, menuItemWidth }) {

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: maxHeight,
        width: menuItemWidth,
      },
    },
  };
  return (
    <FormControl
      sx={{ m: 1, width: '100%', flex: 1 }} size="small" fullWidth>
      <InputLabel
        id="select-small" required={required}>{label}
      </InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        label={label}
        MenuProps={MenuProps}
        inputRef={inputRef}
        autoFocus={autoFocus}
        required={required}
        disabled={disabled}
      >

        {menuItem.map((item, i) => {
          return (
            <MenuItem key={i} value={item} >
              {Array.isArray(item) ? item.join(", ") : item}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}


function NormalFormSingleLineInput({ required, autoFocus, disabled, onError, onBlur, onChange, error, type, field, placeHolder, helperText, inputAdornment, inputStartAdornment, inputEndAdornment, size, inputRef, value, name }) {
  return (
    <>
      <TextField
        name={name}
        id="outlined-basic"
        label={field}
        variant="outlined"
        size={size}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        onError={onError}
        helperText={helperText}
        InputProps={inputAdornment ? {
          startAdornment: (
            <InputAdornment position="start">
              {inputStartAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {inputEndAdornment}
            </InputAdornment>)
        } : null}
        type={type}
        inputRef={inputRef}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        required={required}
      />
    </>
  )
}

export function FormSingleLineAddressInput({ required, onBlur, onChange, error, type, field, placeHolder, helperText, inputAdornment, inputStartAdornment, inputEndAdornment, inputRef, value }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={field}
        variant="outlined"
        size="small"
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputProps={inputAdornment ? {
          startAdornment: (
            <InputAdornment position="start">
              {inputStartAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {inputEndAdornment}
            </InputAdornment>)
        } : null}
        type={type}
        inputRef={inputRef}
        value={value}
        required={required}
      />
    </>
  )
}
const arePropsEqual = (newProps, oldProps) => {
  let result =
    newProps.value === oldProps.value &&
    newProps.error === oldProps.error &&
    oldProps.helperText === newProps.helperText &&
    oldProps.inputAdornmentText === newProps.inputAdornmentText &&
    oldProps.disabled === newProps.disabled;
  return result;
}

export const FormMultiLineInput = memo(NormalFormMultiLineInput, arePropsEqual);
export const FormSingleLineInput = memo(NormalFormSingleLineInput, arePropsEqual);

function NormalFormMultiLineInput(props) {
  return (
    <div id="multiline">
      <Box
        component="form"
        sx={{
          width: '100%',
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            placeholder={props.placeHolder}
            label={props.field}
            multiline
            rows={4}
            ariant="outlined"
            error={props.error}
            helperText={props.helperText}
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.value}
            required={props.required}
          />
        </div>
      </Box>
    </div>
  );
}

export function UploadFile(props) {

  //setFile to current file only if conditions are satifised
  const [file, setFile] = useState(null) //**********STORE FILES IN BACKEND***************
  //changes state depending on correct file type upload
  const [helperText, setHelperText] = useState(props.helperText)
  const [helperTextColor, setHelperTextColor] = useState('black')
  const [textColor, setTextColor] = useState('white')
  const [icon, setIcon] = useState(props.endIcon)
  const [error, setError] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#383838')



  const handleUpload = (e) => {
    const errorMessage = `Invalid file type. ${props.helperText}`;
    const successMessage = `Successfully uploaded: ${e.target.files[0].name}`;
    const uploadedFile = e.target.files[0];
    const allowedTypes = props.accept



    if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {

      setFile(uploadedFile);
      setTextColor('aqua');
      setError(false);
      setHelperTextColor('black');
      setBackgroundColor('black');
      setHelperText(successMessage);
      setIcon(<BsFillCheckCircleFill color="aqua" />);

    } else {
      setFile(null);
      setTextColor('red')
      setHelperText(errorMessage);
      setHelperTextColor('red');
      setBackgroundColor('black');
      setError(true);
      setIcon(<MdOutlineError color="red" size={25} />);

    }
  };

  const handleHover = () => {
    //if there is error turn hover color text to red else aqua
    return error ? 'red' : 'aqua'
  }

  const buttonStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
    borderRadius: "10px",
    width: props.width,
    height: props.height ?? '60px',
    fontSize: props.fontSize,
    ':hover': { bgcolor: 'black', color: handleHover }
  }



  return (
    <div className="uploadFileContainer">
      <Button
        variant="contained"
        component="label"
        startIcon={props.startIcon}
        endIcon={icon}
        sx={buttonStyles}
        disabled={props.disabled}
        onChange={(e) => { handleUpload(e); props.handleFileUpload(e); }}
      >
        <h4 style={{ width: '80%', margin: '10px 0px 10px 0px' }}>
          {props.message}
        </h4>
        <input aria-label="upload picture" className="uploadButton" hidden accept={props.accept} id="icon-button-file" multiple type={props.type} />
      </Button>
      <div style={{ width: props.helperTextPos, position: 'relative', }}>
        {/* set the margin to 1px to remove default margin and position helper text properly*/}
        <FormHelperText sx={{ color: helperTextColor }}>
          {props.helperText}
        </FormHelperText>
      </div>
    </div >
  );
}
export function ActionButton(props) {

  /**
   * Functional props: onClick, onSubmit, type, endIcon, startIcon, disabled, title
   * Style props: bgColor, fontSize, 
   */

  const buttonStyles = {
    backgroundColor: props.bgColor ?? "#383838",
    color: props.color ?? 'white',
    borderRadius: props.borderRadius ?? "10px",
    width: props.width ?? '100%',
    height: props.height ?? '60px',
    paddingTop: props.paddingTop ?? '12px',
    fontSize: props.fontSize,
    whiteSpace: 'nowrap',
    ':hover': { bgcolor: 'black', color: "aqua" },
  }
  const containerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    opacity: props.opacity,
    margin: '10px',
  }

  const helperTextStyles = {
    paddingLeft: '15px'
  }


  return (
    <div className="Button" style={containerStyles}>
      <Button
        variant="contained"
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        type={props.type}
        endIcon={props.endIcon}
        startIcon={props.startIcon}
        disabled={props.disabled}
        sx={buttonStyles}>
        <h3>{props.title}</h3>
      </Button>
      <div className="helper-text" style={helperTextStyles}>
        <FormHelperText>{props.helperText}</FormHelperText>
      </div>
    </div >
  );
}

export function FormSection({ title, message, children }) {
  return (
    <>
      <h2 className="profile">{title}
      </h2>
      <h5>
        <i>
          {message}
        </i>
      </h5>
      {children}
    </>
  );
}

export function FormProgressBar({ steps, currentStep, children }) {
  const progressPercentage = (currentStep / steps) * 100;
  return (
    <div className="progress-bar" style={{ width: '90%' }}>
      {children}
      <div className="progress-bar-filled" style={{ borderRadius: '10px', backgroundColor: "aqua", height: '5px', width: `${progressPercentage}%` }} />
    </div>
  );
};


//FOR FUTURE REFERENCE DO NOT DELETE
//FORM PROGRESS BAR CODE


/* sets the subpage of the form that you're on
also controls progress bar*/

/*
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
  <div>you're done</div>
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


<ValidationProvider>
  <div className="info">
    <div className="ApplicationPage">
      <FormProgressBar steps={totalSteps} currentStep={page}>
        <div className="progressBar" style={progressBarStyles['.progressBar']}>
          <h5 className="1" style={progressBarStyles[`.${page + 1}`]}>(1) Background</h5>
          <h5 className="1" style={progressBarStyles[`.${page}`]}>(2) Uploads</h5>
          <h5 className="1" style={progressBarStyles[`.${page - 1}`]}>(3) LifeStyle</h5>
        </div>
      </FormProgressBar>
      <section className="ApplicationSubPage">
        {pages[page]}
      </section>
    </div>
  </div>
</ValidationProvider>
*/


//CSS
/*
h2,
h5 {
    margin: 12px;
}


p {
    font-weight: lighter;
    font-size: small;
}

.info {
    margin-top: 3%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    justify-content: center;
}

.ApplicationPage {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.ApplicationSubPage {
    padding: 30px 35px 5px 35px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px lightgrey;
    max-width: 600px;
}
*/