import "./Form.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
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

export function FormSingleLineInput(props) {
  return (
    <Box
      component="form"
      id="line"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <CssTextField
        id="outlined-basic"
        label={props.field1}
        variant="outlined"
        size="small"
        placeholder={props.placeHolder1}
      />
      <CssTextField
        id="outlined-basic"
        label={props.field2}
        variant="outlined"
        size="small"
        placeholder={props.placeHolder2}
      />
    </Box>
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

export function ContinueButton() {
  return (
    <div className="continueButton">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: 'white',
          borderRadius: "10px",
          width: '180px',
          height: '60px'
        }}>
        Continue
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