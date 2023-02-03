import "./Form.css"
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment } from "@mui/material";

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

export function FormSingleLineInput({ onBlur, onChange, error, type, field, placeHolder, helperText, inputAdornment, inputAdornmentText, inputRef, value }) {

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

export function ActionButton({ title, onClick, type }) {
  const handleSave = (e) => {
    e.preventDefault();
  }

  return (
    <div className="continueButton">
      <Button
        variant="contained"
        onClick={onClick}
        type={type}
        onSubmit={handleSave}
        sx={{
          backgroundColor: "black",
          color: 'white',
          borderRadius: "10px",
          width: '100%',
          height: '60px',
        }}>
        {title}
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
