import {ReactElement} from "react";
import {Request} from "MapTypes";

/**@brief Nested object styles*/
export interface NestedStyles {
    [key: string]: { [key: string]: string | number }
}

/**@brief Shape for fields component*/
export interface FieldsProps {
    iconStart: ReactElement<any, any>
    fieldTitle: string
    fieldValue: string
    primaryStyles?: { [key: string]: string | number }
    bodyStyles?: { [key: string]: string | number }
}

/**@brief type for dictionary that contains all user requests userID used as key*/
export type RequestDict = { [key: string]: Request }
