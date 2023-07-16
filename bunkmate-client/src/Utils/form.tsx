import "./form.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField, {TextFieldPropsSizeOverrides} from '@mui/material/TextField';
import {OverridableStringUnion} from '@mui/types';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import {FormHelperText, InputAdornment, Typography} from "@mui/material";
import {useState, memo, ReactNode} from 'react'
import {BsFillCheckCircleFill} from "react-icons/bs";
import {MdOutlineError} from "react-icons/md";
import {DateType, DropDownMenuProps, FormSectionProps} from "./types/form.ts";

interface MultipleSelectProps {
    value: string
    helperText: string
    title: string
    menuItems: string[]
    required: boolean
    onChange: Function
}

/**
 * @constructor
 *
 * @brief An MUI dropdown menu component that allows you to select numerous menu items
 *
 * @param value - the value to be displayed
 * @param helperText - helper-text to provide the user more information
 * @param title - title of the input field
 * @param menuItems - An array of menu items
 * @param required - is the field required?
 * @param onChange - Expose the event listener
 * @returns {ReactNode} A multi-select drop-down component
 */
export function MultipleSelectCheckmarks({
                                             value,
                                             helperText,
                                             title,
                                             menuItems,
                                             required,
                                             onChange
                                         }: MultipleSelectProps) {
    const [personName, setPersonName] = React.useState<string[]>([]);
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
    const handleChange = (event: SelectChangeEvent<any>): void => {
        const {target: {value},} = event;
        setPersonName(
            // On autofill, we get a string value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <FormControl size="small">
            <InputLabel id="multiple-checkbox-label" required={required}>{title}</InputLabel>
            <Select
                labelId="multiple-checkbox-label"
                id="multiple-checkbox"
                multiple
                value={value || personName}
                onChange={(event: SelectChangeEvent<any>): void => {
                    handleChange(event);
                    onChange(event);
                }}
                input={<OutlinedInput sx={{width: '100%', maxWidth: 400}} label={title}/>}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {menuItems?.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1}/>
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

interface DatePickerProps {
    label: string
    onChange: (value: DateType, keyInputValue?: string | undefined) => void
    value?: string
    required: boolean
    disabled: boolean
}

/**
 * @constructor
 *
 * @brief A MUI component used for selecting a date from either a calendar adornment or from the input field
 *
 * @param label - the title of the input component
 * @param onChange - Expose the special event listener for Date Picker
 * @param value - value displayed in the date picker
 * @param required - is the field required?
 * @param disabled - is the field disabled
 * @returns {ReactNode} returns a input field and a date picker adornment
 */
export function DatePicker({label, onChange, value, required, disabled}: DatePickerProps) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    renderInput={(params) => <TextField {...params} size="small" required={required}/>}
                />
            </Stack>
        </LocalizationProvider>
    );
}

interface LineBoxProps {
    flex: boolean
    CssTextField: ReactNode[]
}

/**
 * @constructor
 *
 * @brief Styled wrapper for one or numerous MUI input fields
 *
 * @param {boolean} flex - Make container flex or not
 * @param {ReactNode[]} CssTextField - The MUI input fields to be wrapped
 * @returns {ReactNode} Box component that wraps around input fields
 */
export function LineBox({flex, CssTextField}: LineBoxProps): ReactNode {
    const check: 1 | null = flex ? 1 : null; //if true then make use flex: 1 else: use flex null
    return (
        <Box
            component="form"
            id="line"
            sx={{
                '& > :not(style)': {m: 1, flex: check, width: "100%"},
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

/**
 * @constructor
 *
 * @brief A dropdown menu that allows you to select one menu item
 *
 * @param disabled - is the field disabled?
 * @param helperText - helper-text to provide the user more information
 * @param required - is the field required?
 * @param autoFocus - automatically focus on one of the menu items
 * @param inputRef - the underlying html
 * @param defaultValue - the default value to be displayed
 * @param value - the value to be displayed
 * @param onChange - Expose the special event listener
 * @param label - the title the component
 * @param menuItem - An array of menu items
 * @param maxHeight - Constrain the height of the dropdown menu
 * @param menuItemWidth - Constrain the width of the dropdown menu
 * @returns {ReactNode} An mui component that returns a dropdown menu on click
 */
export function DropDownMenu({
                                 disabled,
                                 helperText,
                                 required,
                                 autoFocus,
                                 inputRef,
                                 defaultValue,
                                 value,
                                 onChange,
                                 label,
                                 menuItem,
                                 maxHeight,
                                 menuItemWidth
                             }: DropDownMenuProps) {

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
            sx={{m: 1, width: '100%', flex: 1}} size="small" fullWidth>
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
                {menuItem.map((item: string, i: number) => {
                    return (
                        <MenuItem key={i} value={item}>
                            {Array.isArray(item) ? item.join(", ") : item}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

interface NormalFormSingleLineInputProps {
    sx: object
    required: boolean
    autoFocus: boolean
    disabled: boolean
    onError: () => void
    onBlur: () => void
    onChange: () => void
    error: boolean
    type: string
    field: string
    placeHolder: string
    helperText: string
    inputAdornment: boolean
    inputStartAdornment: React.ReactElement
    inputEndAdornment: React.ReactElement
    size: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides> | undefined
    inputRef: React.Ref<any>
    value: string
    name: string
}

function NormalFormSingleLineInput({
                                       sx,
                                       required,
                                       autoFocus,
                                       disabled,
                                       onError,
                                       onBlur,
                                       onChange,
                                       error,
                                       type,
                                       field,
                                       placeHolder,
                                       helperText,
                                       inputAdornment,
                                       inputStartAdornment,
                                       inputEndAdornment,
                                       size,
                                       inputRef,
                                       value,
                                       name
                                   }: NormalFormSingleLineInputProps) {
    return (
        <>
            <TextField
                name={name}
                id="outlined-basic"
                label={field}
                variant="outlined"
                size={size}
                sx={sx}
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
                } : undefined}
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

/**
 * @constructor
 *
 * @brief
 *
 * @param required - is the field required?
 * @param onBlur -
 * @param onChange -
 * @param error -
 * @param type -
 * @param field -
 * @param placeHolder -
 * @param helperText -
 * @param inputAdornment -
 * @param inputStartAdornment -
 * @param inputEndAdornment -
 * @param inputRef - The input ref
 * @param value -
 */
export function FormSingleLineAddressInput({
                                               required,
                                               onBlur,
                                               onChange,
                                               error,
                                               type,
                                               field,
                                               placeHolder,
                                               helperText,
                                               inputAdornment,
                                               inputStartAdornment,
                                               inputEndAdornment,
                                               inputRef,
                                               value
                                           }) {
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
                        variant="outlined"
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

    //setFile to current file only if conditions are satisfied
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


        //props.storeFile is used as a default value if the user has uploaded files before
        //storedFile might not be the best because after user uploads one photo then uploads an incorret photo type after it will show as valid
        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {

            setFile(uploadedFile);
            setTextColor('aqua');
            setHelperText(successMessage);
            setError(false);
            setHelperTextColor('black');
            setBackgroundColor('black');
            setIcon(<BsFillCheckCircleFill color="aqua"/>);

        } else {
            setFile(null);
            setTextColor('red')
            setHelperText(errorMessage);
            setHelperTextColor('red');
            setBackgroundColor('black');
            setError(true);
            setIcon(<MdOutlineError color="red" size={25}/>);

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
        ':hover': {bgcolor: 'black', color: handleHover}
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
                onChange={(e) => {
                    handleUpload(e);
                    props.handleFileUpload(e);
                }}
            >
                <h4 style={{width: '80%', margin: '10px 0px 10px 0px'}}>
                    {props.message}
                </h4>
                <input aria-label="upload picture" className="uploadButton" hidden accept={props.accept}
                       id="icon-button-file" multiple type={props.type}/>
            </Button>
            <div style={{width: props.helperTextPos, position: 'relative',}}>
                {/* set the margin to 1px to remove default margin and position helper text properly*/}
                <FormHelperText sx={{
                    color: helperTextColor,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: '100%'
                }}>
                    {helperText}
                </FormHelperText>
            </div>
        </div>
    );
}

export function ActionButton(props) {

    /**
     * Functional props: onClick, onSubmit, type, endIcon, startIcon, disabled, title
     * Style props: bgColor, fontSize,
     */
    type Styles = { [key: string]: string | { [key: string]: string } }

    const buttonStyles: Styles = {
        backgroundColor: props.bgColor ?? "#383838",
        color: props.color ?? 'white',
        borderRadius: props.borderRadius ?? "10px",
        width: props.width ?? '100%',
        height: props.height ?? '60px',
        paddingTop: props.paddingTop ?? '7px',
        fontSize: props.fontSize,
        whiteSpace: 'nowrap',
        ':hover': {backgroundColor: props.hoverBgColor ?? 'black', color: props.hoverColor ?? "aqua"},
    }
    const containerStyles: Styles = {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: props.containerWidth,
        opacity: props.opacity,
        margin: props.margin ?? '10px',
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
        </div>
    );
}

/**
 * @constructor
 *
 * @brief Wrapper that styles the form section area
 *
 * @param title - the title of the form
 * @param message - the message explaining what the purpose of the section of the form is for
 * @param children - Any react elements such as input fields
 */
export function FormSection({title, message, children}: FormSectionProps) {
    return (
        <>
            <h2 className="profile">
                {title}
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


//FOR FUTURE REFERENCE DO NOT DELETE
//FORM PROGRESS BAR CODE
/*
export function FormProgressBar({steps, currentStep, children}) {
    const progressPercentage = (currentStep / steps) * 100;
    return (
        <div className="progress-bar" style={{width: '90%'}}>
            {children}
            <div className="progress-bar-filled" style={{
                borderRadius: '10px',
                backgroundColor: "aqua",
                height: '5px',
                width: `${progressPercentage}%`
            }}/>
        </div>
    );
};
 */


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