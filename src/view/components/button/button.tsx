import * as React from "react";
import {ButtonProps} from "./buttonProps";
// import styled from "../styled"
import {useAppState, useAppTheme} from "../../context/appContext";
import MaterialButton from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {AppState} from "../../../data/models/app";

// const ButtonStyled = styled.button<ButtonProps>`
//   text-align: center;
//   width : ${props => props.style?.width || "240px"};
//   height: ${props => props.style?.height || "44px"};
//   padding: ${props => props.style?.padding};
//   margin: ${props => props.style?.margin || "10px"};
//   color: ${props => props.style?.textColor || props.theme.palette.primaryButtonTextColor || "white"};
//   font-size: ${props => props.style?.fontSize || "1em"};
//   border: 2px solid ${props => props.style?.borderColor || props.theme.palette.primaryButtonBackgroundColor || props.theme.palette.primaryColor};
//   border-radius: 4px;
//   background: ${props => props.style?.backgroundColor || props.theme.palette.primaryButtonBackgroundColor || props.theme.palette.primaryColor};
// `;


const useStyles = makeStyles((theme) => ({

    root: (props: ButtonProps) => (
        {
            background: props.style?.backgroundColor || theme.palette.primary.main,
            color: props.style?.textColor ||  "white",
            width: props.style?.width || "300px",
            height: props.style?.height || "50px",
            margin: props.style?.margin || "10px"
        })

}));

export const Button: React.FC<ButtonProps> = (props) => {
    const styles = useStyles(props);
    let appState = useAppState();
    let {disabling} = props;
    if (!disabling) {
        disabling = true;
    }
    let loading = disabling && (appState === AppState.processing || appState === AppState.loading);
    return (
        <MaterialButton disabled={loading} {...props} className={styles.root} color={"primary"} variant="contained">{props.children}</MaterialButton>
    )
};

export const ButtonSecondary: React.FC<ButtonProps> = (props) => {
    let appTheme = useAppTheme();
    return (
        <Button {...props} style={{
            backgroundColor: appTheme.palette.secondaryButtonBackgroundColor,
            borderColor: appTheme.palette.secondaryColor,
            textColor: appTheme.palette.secondaryButtonTextColor
        }} />
    )
};

