import {LabelProps} from "../label/labelProps";

export interface InputFieldProps extends LabelProps {
    placeholder?: string
    type?: string
    required?: boolean
    name? : string
    value: string
}