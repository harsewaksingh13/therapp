import {LabelProps} from "../label/labelProps";
import {ChangeEventHandler} from "react";

export interface InputFieldProps extends LabelProps {
    placeholder?: string
    type?: string
    required?: boolean
    value?: string
    onChange? : ChangeEventHandler<HTMLInputElement>
}