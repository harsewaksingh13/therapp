import * as React from "react";
import {InputFieldProps} from "./inputFieldProps";
import Label from "../label/label";
import {useState} from "react";


const InputField: React.FC<InputFieldProps> = (props) => {
    const [focus, setFocus] = useState(false);
    return (
        <div>
            <Label text={props.placeholder}/>
            <input {...props}
                   onBlur={() =>
                       setFocus(false)
                   }
                   onFocus={() =>
                       setFocus(true)
                   }
            />
        </div>
    )
};

export default InputField