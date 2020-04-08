import {LabelProps, LabelStyle} from "../label/labelProps";
import {MouseEventHandler} from "react";

export interface ButtonProps extends LabelProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    disabling?: Boolean
}