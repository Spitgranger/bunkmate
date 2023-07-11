import {ReactElement} from "react";

/**@brief Nested object styles*/
export interface NestedStyles {
    [key: string]: { [key: string]: string | number }
}

/**@brief Shape for fields component*/
export interface FieldsProps {
    iconStart: ReactElement<any, any>
    fieldTitle: string
    fieldValue: string
    primaryStyles?: [key: string]
    bodyStyles?: [key: string]
}