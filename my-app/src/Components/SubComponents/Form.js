import "./Form.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

import Stack from '@mui/material/Stack';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export function MaterialUIPickers({ label }) {
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
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#2fd0d8',
  },
  '& label.Mui-underline:after': {
    borderBottomColor: '#2fd0d8',
  },
});

export function FormSingleLineInput({ field, placeHolder, helperText }) {
  return (
    <>
      <CssTextField
        id="outlined-basic"
        label={field}
        variant="outlined"
        size="small"
        placeholder={placeHolder}
        helperText={helperText}
      />
    </>
  )
}
export function DropDownMenu({ name, menuItem, helperText }) {
  const [field, setField] = React.useState('');

  const handleChange = (event) => {
    setField(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: '100%', flex: 1 }} size="small" fullWidth>
      <InputLabel id="demo-select-small">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={field}
        label={name}
        onChange={handleChange}
        helperText={helperText}
      >
        {menuItem.map((item, i) => {
          return (<MenuItem key={i} value={item}>{item}</MenuItem>);
        })}
      </Select>
    </FormControl>
  );
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
          <CssTextField
            id="outlined-multiline-static"
            fullWidth
            placeholder='Tell Us a Bit About Yourself'
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
  return (
    <div className="uploadFileContainer">
      <label className="uploadFile">
        {props.message}
        <input className="uploadButton" accept="image/*" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton sx={{ color: "aqua" }} aria-label="upload picture" component="span">
            <CameraAltIcon />
          </IconButton>
        </label>
      </label>
    </div>
  );
}

export function ActionButton({ title }) {
  return (
    <div className="continueButton">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: 'white',
          borderRadius: "10px",
          width: '100%',
          height: '60px'
        }}>
        {title}
      </Button>
    </div >
  );
}

export function FormSection(props) {
  return (
    <>
      <h2 className="profile">{props.title}
      </h2>
      <h5>
        <i>
          {props.message}
        </i>
      </h5>
    </>
  );
}
