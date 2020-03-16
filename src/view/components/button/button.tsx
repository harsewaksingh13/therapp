import * as React from "react";
import {ButtonProps} from "./buttonProps";


const Button: React.FC<ButtonProps> = ({ text, ...props}) => {
    return (<button {...props}> {text} </button>)
};

export default Button