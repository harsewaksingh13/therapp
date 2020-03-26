import * as React from "react";
import {LabelProps} from "./labelProps";


export const Label : React.FC<LabelProps> = (props) => {
    return (<label {...props}>
        {props.text}
    </label>)
};

