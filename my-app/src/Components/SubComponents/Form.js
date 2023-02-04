import "./Form.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment } from "@mui/material";
import { useState } from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
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

export function MultipleSelectCheckmarks({ title, menuItems }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <FormControl sx={{ m: 1, width: '100%', flex: 1, color: "black" }} size="small">
      <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label={title} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        autoWidth
      >
        {menuItems.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function DatePicker({ label }) {
  const [value, setValue] = React.useState(dayjs('2022-09-15T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} size="small" />}
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
        '& > :not(style)': { m: 1, flex: check, width: "100%", },
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

export function DropDownMenu({ value, onChange, label, menuItem, helperText }) {

  return (
    <FormControl placeholder="wow" sx={{ m: 1, width: '100%', flex: 1 }} size="small" fullWidth>
      <InputLabel
        id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChange}
        helperText={helperText}
        label={label}
      >
        {menuItem.map((item, i) => {
          return (<MenuItem key={i} value={item} >{item}</MenuItem>);
        })}
      </Select>
    </FormControl>
  );
}

export function FormSingleLineInput({ onBlur, onChange, error, type, field, placeHolder, helperText, inputAdornment, inputAdornmentText, size, inputRef, value }) {

  return (
    <>
      <TextField
        id="outlined-basic"
        label={field}
        variant="outlined"
        size={size}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputProps={inputAdornment ? { startAdornment: <InputAdornment position="start">{inputAdornmentText}</InputAdornment> } : null}
        type={type}
        inputRef={inputRef}
        value={value}
      />
    </>
  )
}

export function FormSingleLineAddressInput({ onBlur, onChange, error, type, field, placeHolder, helperText, inputAdornment, inputAdornmentText, inputRef }) {

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
        InputProps={inputAdornment ? { startAdornment: <InputAdornment position="start">{inputAdornmentText}</InputAdornment> } : null}
        type={type}
        inputRef={inputRef}
      />
    </>
  )
}


export function FormMultiLineInput(props) {
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
            variant="outlined"
            helperText={props.helperText}
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
  const [helperText, setHelperText] = useState('')
  const [helperTextColor, setHelperTextColor] = useState('black')
  const [textColor, setTextColor] = useState('white')
  const [icon, setIcon] = useState(props.endIcon)
  const [error, setError] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#383838')

  const errorMessage = `Invalid file type. ${props.helperText}`;

  const handleMouseEnter = () => {
    setHelperText(error ? errorMessage : props.helperText)
  }

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const allowedTypes = props.accept

    if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {

      setFile(uploadedFile);
      setTextColor('aqua');
      setError(false);
      setHelperTextColor('black');
      setBackgroundColor('black');
      setIcon(<BsFillCheckCircleFill color="aqua" />)

    } else {
      console.log(uploadedFile)
      setFile(null);
      setTextColor('red')
      setHelperText(errorMessage)
      setHelperTextColor('red');
      setError(true)
      setIcon(<MdOutlineError color="red" size={25} />)

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
    height: '60px',
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
        onMouseEnter={handleMouseEnter}
        onChange={handleUpload}
      >
        <h4 style={{ width: '80%', margin: '10px 0px 10px 0px' }}>
          {props.message}
        </h4>
        <input aria-label="upload picture" className="uploadButton" hidden accept={props.accept} id="icon-button-file" multiple type={props.type} />
      </Button>
      <div style={{ width: props.helperTextPos, position: 'relative', left: '1px' }}>
        {/* set the margin to 1px to remove default margin and position helper text properly*/}
        <h5 style={{ color: helperTextColor, margin: '1px' }}>{helperText}</h5>
      </div>
    </div >
  );
}

export function ActionButton(props) {

  const buttonStyles = {
    backgroundColor: "#383838",
    color: 'white',
    borderRadius: "10px",
    width: props.width,
    height: '60px',
    paddingTop: '2px',
    fontSize: props.fontSize,
    ':hover': { bgcolor: 'black', color: "aqua" },
  }


  return (
    <div className="Button">
      <Button
        variant="contained"
        onClick={props.onClick}
        type={props.type}
        endIcon={props.endIcon}
        startIcon={props.startIcon}
        sx={
          buttonStyles
        }>
        <h3>
          {props.title}
        </h3>
      </Button>
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
