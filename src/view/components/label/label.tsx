import * as React from "react";
import {LabelProps} from "./labelProps";

import { Typography } from '@material-ui/core';

export const Label : React.FC<LabelProps> = (props) => {
    return (<Typography {...props}>
        {props.text}
    </Typography>)
};

export const LabelHeader : React.FC<LabelProps> = (props) => {
    return (<Typography variant={"h2"} {...props}>
        {props.text}
    </Typography>)
}
