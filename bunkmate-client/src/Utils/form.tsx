import "./form.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import {Link} from '@mui/material'
import TextField from '@mui/material/TextField';
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
import {useState, memo, ReactNode, FormEvent, useEffect, useCallback} from 'react'
import {BsFillCheckCircleFill} from "react-icons/bs";
import {MdOutlineError} from "react-icons/md";
import {useDebouncedCallback} from "use-debounce";
import {
    LineBoxProps,
    NormalFormSingleLineInputProps,
    DatePickerProps,
    DropDownMenuProps,
    FormSectionProps,
    MultipleSelectProps, NormalMultiLineInputProps, UploadFileProps, ActionButtonProps
} from "./types/form.ts";


/**
 * @constructor
 *
 * @brief An MUI dropdown menu component that allows you to select numerous menu items
 */
export function
MultipleSelectCheckmarks({value, helperText, title, menuItems, required, onChange}: MultipleSelectProps) {

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


/**
 * @constructor
 *
 * @brief A MUI component used for selecting a date from either a calendar adornment or from the input field
 */
export function DatePicker({helperText, onBlur, error, label, onChange, value, required, disabled}: DatePickerProps) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    renderInput={(params) =>
                        <TextField {...params}
                                   error={error}
                                   size="small"
                                   helperText={helperText}
                                   required={required}
                                   onBlur={onBlur}
                        />}
                />
            </Stack>
        </LocalizationProvider>
    );
}

/**
 * @constructor
 *
 * @brief Styled wrapper for one or numerous MUI input fields
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
 */
export function DropDownMenu(props: DropDownMenuProps): ReactNode {

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: props.maxHeight,
                width: props.menuItemWidth,
            },
        },
    };

    return (
        <FormControl
            sx={{m: 1, width: '100%', flex: 1}} size="small" fullWidth>
            <InputLabel
                id="select-small" required={props.required}>{props.label}
            </InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                error={props.error}
                defaultValue={props.defaultValue}
                label={props.label}
                MenuProps={MenuProps}
                inputRef={props.inputRef}
                autoFocus={props.autoFocus}
                required={props.required}
                disabled={props.disabled}
            >
                {props.menuItem.map((item: string, i: number) => {
                    return (
                        <MenuItem key={i} value={item}>
                            {Array.isArray(item) ? item.join(", ") : item}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}


/**
 * @constructor
 *
 * @brief A styled animated single line input field component that collects and records user info
 */
function NormalFormSingleLineInput(props: NormalFormSingleLineInputProps) {
    return (
        <>
            <TextField
                name={props.name}
                id={props.id}
                label={props.field}
                variant="outlined"
                size={props.size}
                sx={props.sx}
                placeholder={props.placeHolder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                error={props.error}
                onError={props.onError}
                helperText={props.helperText}
                InputProps={props.inputAdornment ? {
                    startAdornment: (
                        <InputAdornment position="start">
                            {props.inputStartAdornment}
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {props.inputEndAdornment}
                        </InputAdornment>)
                } : undefined}
                type={props.type}
                inputRef={props.inputRef}
                value={props.value}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                required={props.required}
            />
        </>
    )
}

/*
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
*/


const arePropsEqual = (newProps: Readonly<NormalFormSingleLineInputProps | NormalMultiLineInputProps>,
                       oldProps: Readonly<NormalFormSingleLineInputProps | NormalMultiLineInputProps>) => {
    return (
        newProps.value === oldProps.value &&
        newProps.error === oldProps.error &&
        oldProps.helperText === newProps.helperText &&
        oldProps.disabled === newProps.disabled)
}

export const FormMultiLineInput = memo(NormalFormMultiLineInput, arePropsEqual);
export const FormSingleLineInput = memo(NormalFormSingleLineInput, arePropsEqual);


/**
 * @description Wrapper for NormalFormMultiLineInput to debounce the onChange function to improve performance
 * @see NormalFormMultiLineInput
 * @see NormalMultiLineInputProps
 * @param props {NormalMultiLineInputProps} Same for the undebounced component
 */
export const NormalFormMultiLineInputWrapper = (props: NormalMultiLineInputProps): ReactNode => {
    const [innerValue, setInnerValue] = useState<string>("");
    useEffect(() => {
        if (props.value) {
            setInnerValue(props.value as string);
        } else {
            setInnerValue('');
        }
    }, [props.value]);

    const debouncedHandleOnChange = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (props.onChange) {
                props.onChange(event);
            }
        },
        200
    );

    const handleOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);

    }, []);

    return (
        <NormalFormMultiLineInput
            id={props.id}
            name={props.name}
            placeHolder={props.placeHolder}
            field={props.field}
            error={props.error}
            helperText={props.helperText}
            onBlur={props.onBlur}
            required={props.required}
            onChange={handleOnchange}
            value={innerValue}/>
    );

}

/**
 * @constructor
 *
 * @brief A multi line version of the single line text field
 */
function NormalFormMultiLineInput(props: NormalMultiLineInputProps): ReactNode {
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
                        id={props.id}
                        name={props.name}
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

/**
 * @constructor
 *
 * @brief A custom component that records uploaded files and type checks them
 */
export function UploadFile(props: UploadFileProps): ReactNode {

    //changes state depending on correct file type upload
    const [helperText, setHelperText] = useState(props.helperText)
    const [helperTextColor, setHelperTextColor] = useState('black')
    const [textColor, setTextColor] = useState('white')
    const [icon, setIcon] = useState(props.endIcon)
    const [error, setError] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('#383838')


    const handleUpload = (e: FormEvent<HTMLLabelElement>): void => {
        const errorMessage = `Invalid file type. ${props.helperText}`;
        const eventTarget = e.target as HTMLInputElement
        const successMessage = `Successfully uploaded: ${eventTarget.files ? eventTarget.files[0].name : ""}`;
        const uploadedFile = eventTarget.files ? eventTarget.files[0] : null
        const allowedTypes = props.accept


        //props.storeFile is used as a default value if the user has uploaded files before
        //storedFile might not be the best because after user uploads one photo then uploads an incorrect photo type after it will show as valid
        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {

            setTextColor('aqua');
            setHelperText(successMessage);
            setError(false);
            setHelperTextColor('black');
            setBackgroundColor('black');
            setIcon(<BsFillCheckCircleFill color="aqua"/>);

        } else {
            setTextColor('red')
            setHelperText(errorMessage);
            setHelperTextColor('red');
            setBackgroundColor('black');
            setError(true);
            setIcon(<MdOutlineError color="red" size={25}/>);

        }
    };

    const handleHover = (): string => {
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
                <input aria-label="upload picture"
                       className="uploadButton"
                       hidden
                       accept={props.accept}
                       id="icon-button-file"
                       multiple
                       type={props.type}/>
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

/**
 * @constructor
 *
 * @brief
 */
export function ActionButton(props: ActionButtonProps): ReactNode {

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
        fontSize: props.fontSize ?? '15px',
        whiteSpace: 'nowrap',
        ':hover': {backgroundColor: props.hoverBgColor ?? 'black', color: props.hoverColor ?? "aqua"},
    }
    const containerStyles: Styles = {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: props.containerWidth ?? '100%',
        opacity: props.opacity ?? '0.85',
        margin: props.margin ?? '10px',
    }

    return (
        <div className="Button" style={containerStyles}>
            <Button
                variant="contained"
                component={Link}
                onClick={props.onClick}
                onSubmit={props.onSubmit}
                type={props.type}
                endIcon={props.endIcon}
                startIcon={props.startIcon}
                disabled={props.disabled}
                sx={buttonStyles}>
                <h3>{props.title}</h3>
            </Button>
            <div className="helper-text" style={{paddingLeft: '15px'}}>
                <FormHelperText>{props.helperText}</FormHelperText>
            </div>
        </div>
    );
}

/**
 * @constructor
 *
 * @brief Wrapper that styles the form section area
 */
export function FormSection({title, message}: FormSectionProps) {
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
        </>
    );
}