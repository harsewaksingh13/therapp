import * as React from "react";
import {NavigationBarProps} from "./navigationBarProps";


const NavigationBar : React.FC<NavigationBarProps> = (props) => {
    return (<div>
        {props.children}
    </div>)
};

export default NavigationBar