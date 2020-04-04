import * as React from "react";
import {InputFieldProps} from "./inputFieldProps";
import {useState} from "react";
import styled from "../styled"
import {Label, Section} from "..";
import navigator from "../../navigation/appNavigator";
import {AppRoute} from "../../navigation/appRoute";
import {Route} from "react-router";

const Input = styled.input<InputFieldProps>`
  height: ${prop => prop.style?.width || "30px"};
  width: ${prop => prop.style?.width || "220px"};
  padding: 0.5em;
  margin: 0.5em;
  font-size: ${props => props.style?.fontSize || "1em"};
  color: ${prop => prop.style?.color || prop.theme.palette.primaryTextColor || "#333333"}
  background: ${prop => prop.style?.backgroundColor || prop.theme.palette.backgroundColor};
  border: 0.5px solid;
  border-radius: 3px;
`;

export const InputField: React.FC<InputFieldProps> = (props) => {
    const [, setFocus] = useState(false);
    return (
        <Section>
            <Label text={props.placeholder}/>
            <Input {...props}
                   onBlur={() =>
                       setFocus(false)
                   }
                   onFocus={() =>
                       setFocus(true)
                   }
            />
        </Section>
    )
};

interface InputFormProps {
    fields: [InputFieldProps]
}

export const InputForm: React.FC<InputFormProps> = (props) => {
    return (
        <Section>
            {
                props.fields.map((inputFieldProps: InputFieldProps) => {
                    return <InputField {...inputFieldProps}/>
                })
            }
        </Section>
    )
}