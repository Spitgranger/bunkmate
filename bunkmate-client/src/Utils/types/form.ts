import {
    FocusEventHandler,
    FormEventHandler,
    MouseEventHandler,
    ReactEventHandler,
    ReactNode,
    Ref,
    SyntheticEvent
} from "react";
import * as React from "react";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField";
import {SelectChangeEvent} from "@mui/material/Select";

/* Value from on change event listener for the date picker component*/
export type DateType = string | number | undefined | null

/**parameter types for the line box component*/
export interface LineBoxProps {
    /**Should the component take up 100% width?*/
    flex: boolean
    /**The input fields that will go into line box wrapper*/
    CssTextField: ReactNode[]
}

/** parameter types for the drop-down menu component*/
export interface DropDownMenuProps {
    /**Needed for formik, must match the initial value being used*/
    id: string
    /**Needed for formik, must match the initial value being used*/
    name: string
    /**is the field disabled?*/
    disabled: boolean
    /**located under the text-field, it can provide the user with more info*/
    helperText?: string | undefined
    /**is the field required?*/
    required: boolean
    /** If true then the input is focused on the first mount*/
    autoFocus?: boolean
    /**the underlying html*/
    inputRef?: Ref<any> | null
    /**the default value to be displayed*/
    defaultValue?: string
    /**the value to be displayed in the input box*/
    value: string | undefined
    /** Expose the special event listener*/
    onChange: (event: SelectChangeEvent<string | undefined>, child?: ReactNode) => void
    /** the title the component*/
    label: string
    /** An array of menu items*/
    menuItem: string[]
    /** Constrain the height of the dropdown menu*/
    maxHeight?: string
    /** Constrain the width of the dropdown menu*/
    menuItemWidth?: string
    /**if true then the component will be highlighted in red*/
    error?: boolean
    /**Event listener used to track if component has been visited or not*/
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

/**Parameter types for the form section components*/
export interface FormSectionProps {
    /**the title of the form section*/
    title: string
    /**Message displayed to make the user to make them understand what this section of the form is used for*/
    message?: string
}

/**Parameter types for single line input component*/
export interface NormalFormSingleLineInputProps {
    /**Needed for formik, must match the initial value being used*/
    id: string
    /**Needed for formik, must match the initial value being used*/
    name: string
    /**Custom styles for text field component*/
    sx?: object
    /**Is the field required?*/
    required?: boolean
    /**If true then the input element is focused on the first mount*/
    autoFocus?: boolean
    /**Is the field disabled?*/
    disabled?: boolean
    /**Event listener for errors*/
    onError?: ReactEventHandler<HTMLDivElement> | undefined
    /**Event listener for changing component focus*/
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    /**Event listener for any event changes*/
    onChange: (value: any) => void
    /**if true then the component will be highlighted in red*/
    error?: boolean
    /**Type of input element it should be a valid HTML5 input element*/
    type?: string
    /**Title of the component*/
    field: string
    /**Greyed out read only value within the text field*/
    placeHolder?: string
    /**located under the text-field, it can provide the user with more info*/
    helperText?: string | undefined
    /**Should an input adornment be displayed?*/
    inputAdornment?: boolean
    /**Functional icon located at the start of the text-field*/
    inputStartAdornment?: React.ReactElement
    /**Functional icon located at the end of the text-field*/
    inputEndAdornment?: React.ReactElement
    /**small or medium-sized text field size*/
    size: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides> | undefined
    /**ref the underlying html*/
    inputRef?: React.Ref<any>
    /**The value to be displayed*/
    value?: string | undefined
}

/**Parameter types for multiline line input component*/
export interface NormalMultiLineInputProps {
    /**Needed for formik, must match the initial value being used*/
    id: string
    /**Needed for formik, must match the initial value being used*/
    name: string
    /**Custom styles for text field component*/
    sx?: object
    /**Is the field required?*/
    required: boolean
    /**If true then the input element is focused on the first mount*/
    autoFocus?: boolean
    /**Is the field disabled?*/
    disabled?: boolean
    /**Event listener for changing component focus*/
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    /**Event listener for any event changes*/
    onChange: (value: any) => void
    /**if true then the component will be highlighted in red*/
    error?: boolean
    /**Greyed out read only value within the text field*/
    placeHolder?: string
    /**located under the text-field, it can provide the user with more info*/
    helperText?: string | undefined
    /**The title of the component*/
    field: string
    /**The value to be displayed*/
    value: string | undefined
}

/**parameter types for the date picker component*/
export interface DatePickerProps {
    /**Expose the on blur event listener*/
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    /**controls error state and changes the mui design if error is true*/
    error: boolean
    /**the title of the input component*/
    label: string
    /**Expose the special event listener for Date Picker*/
    onChange: (value: DateType, keyInputValue?: string | undefined) => void
    /**value displayed in the date picker*/
    value?: string
    /**is the field required*/
    required: boolean
    /**is the field disabled*/
    disabled: boolean
    /**Used to display error message*/
    helperText: string | undefined
}

/**parameter types for multiple select component*/
export interface MultipleSelectProps {
    /**the value to be displayed*/
    value: string
    /**located under the text-field, it can provide the user with more info*/
    helperText: string
    /**title of the input field*/
    title: string
    /**An array of menu items*/
    menuItems: string[]
    /**is the field required?*/
    required: boolean
    /**Expose the event listener*/
    onChange: Function
}

/**parameter types for upload files component*/
export interface UploadFileProps {
    /**located under the text-field, it can provide the user with more info*/
    helperText?: string | undefined
    /**Icon that's displayed at the start of the component*/
    startIcon?: ReactNode
    /**Icon that's displayed at the end of the component*/
    endIcon?: ReactNode
    /**The allowed file types that can be used*/
    accept: string
    /**the buttons width*/
    width?: string
    /**the buttons height*/
    height?: string
    /**The fontsize of the text within the button*/
    fontSize?: string
    /**Is the field disabled?*/
    disabled?: boolean
    /**Record the uploaded file to the backend*/
    handleFileUpload: (e: SyntheticEvent) => void
    /**The message displayed on the upload button*/
    message: string
    /**The type of input allowed ex. string | number | file*/
    type: string
    /**The positioning of the helper text*/
    helperTextPos?: string
}

/**The parameter types for the action button component*/
export interface ActionButtonProps {
    /**Expose the on click event listener*/
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    /**Expose the on submit event listener*/
    onSubmit?: FormEventHandler<HTMLAnchorElement> | undefined
    /**The button type: "button" | "reset" | "submit"*/
    type: string
    /**The title of the component*/
    title: string | ReactNode
    /**located under the text-field, it can provide the user with more info*/
    helperText?: string | undefined
    /**The icon located at the start of component*/
    startIcon?: ReactNode
    /**The icon located at the end of component*/
    endIcon?: ReactNode
    /**Is the component disabled?*/
    disabled: boolean
    /**Button styles alternate background color*/
    bgColor?: string
    /**Button styles alternate color*/
    color?: string
    /**Button styles alternate borderRadius*/
    borderRadius?: string
    /**Button styles alternate width*/
    width?: string
    /**Button styles alternate height*/
    height?: string
    /**Button styles alternate padding top*/
    paddingTop?: string
    /**Button styles alternate font size*/
    fontSize?: string
    /**Button styles alternate hover background color*/
    hoverBgColor?: string
    /**Button styles alternate hover color*/
    hoverColor?: string
    /**container styles alternate container width*/
    containerWidth?: string
    /**container styles alternate opacity*/
    opacity?: string
    /**container styles alternate margin*/
    margin?: string
}