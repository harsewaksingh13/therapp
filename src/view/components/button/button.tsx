import * as React from "react";
import {ButtonProps} from "./buttonProps";
import styled from "../styled"
import {useAppTheme} from "../../context/appContext";

const ButtonStyled = styled.button<ButtonProps>`
  text-align: center;
  width : ${props => props.style?.width || "240px"};
  height: ${props => props.style?.height || "44px"};
  padding: ${props => props.style?.padding};
  margin: ${props => props.style?.margin || "10px"};
  color: ${props => props.style?.textColor || "white"};
  font-size: ${props => props.style?.fontSize || "1em"};
  border: 2px solid ${props => props.style?.backgroundColor || props.theme.primaryColor};
  border-radius: 4px;
  background: ${props => props.style?.backgroundColor || props.theme.primaryColor};
`;

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <ButtonStyled {...props}> {props.children}</ButtonStyled>
    )
};

export const ButtonSecondary: React.FC<ButtonProps> = (props) => {
    let appTheme = useAppTheme();
    return (
        <Button style={{backgroundColor:appTheme.secondaryColor}} {...props}/>
    )
};

