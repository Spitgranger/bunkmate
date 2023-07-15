import {ReactNode, Ref} from "react";
import {SelectChangeEvent} from "@mui/material/Select";

/* Value from on change event listener for the date picker component*/
export type DateType = string | number | undefined | null

/*parameter types for the drop-down menu component*/
export interface DropDownMenuProps {
    disabled: boolean
    helperText: string
    required: boolean
    autoFocus: boolean
    inputRef: Ref<any> | null
    defaultValue: string
    value: string
    onChange: (event: SelectChangeEvent, child: ReactNode) => void
    label: string
    menuItem: string[]
    maxHeight: string
    menuItemWidth: string
}