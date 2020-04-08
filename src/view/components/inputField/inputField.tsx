import * as React from "react";
import {InputFieldProps} from "./inputFieldProps";
import {useState} from "react";
import styled from "../styled"
import {Label, Section} from "..";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ButtonProps} from "../button/buttonProps";


// const Input = styled.input<InputFieldProps>`
//   height: ${prop => prop.style?.width || "30px"};
//   width: ${prop => prop.style?.width || "320px"};
//   padding: 0.5em;
//   margin: 0.5em;
//   font-size: ${props => props.style?.fontSize || "1em"};
//   color: ${prop => prop.style?.color || prop.theme.palette.primaryTextColor || "#333333"}
//   background: ${prop => prop.style?.backgroundColor || prop.theme.palette.backgroundColor};
//   border: 0.5px solid;
//   border-radius: 3px;
// `;

const useStyles = makeStyles((theme) => ({

    root: (props: InputFieldProps) => (
        {
            background: props.style?.backgroundColor,
            color: props.style?.textColor ||  "white",
            width: props.style?.width || "300px",
            height: props.style?.height || "50px",
            margin: props.style?.margin || "10px"
        })

}));

export const InputField: React.FC<InputFieldProps> = (props) => {
    const styles = useStyles(props);

    return (
        <TextField {...props} className={styles.root} label={props.placeholder} variant="outlined" />

        // <Section>
        //     <Label text={props.placeholder}/>
        //     <Input {...props}
        //            onBlur={() =>
        //                setFocus(false)
        //            }
        //            onFocus={() =>
        //                setFocus(true)
        //            }
        //     />
        // </Section>
    )
};

interface InputFormProps {
    fields: [InputFieldProps]
}

export const InputForm: React.FC<InputFormProps> = (props) => {
    return (
        <Section>
            <form  noValidate autoComplete="off">
            {
                props.fields.map((inputFieldProps: InputFieldProps) => {
                    return <InputField {...inputFieldProps}/>
                })
            }
            </form>
        </Section>
    )
};