import * as React from "react";
import {NavigationBarProps} from "./navigationBarProps";
import styled from "../styled"

const StyledNavigationBar = styled.section<NavigationBarProps>`
  padding: 0.025em 8em 0em 8em;
  background: ${props => props.theme.primaryColor};
  height : 50px;
  border: 2px solid;
  color: ${props => props.theme.primaryColor};
`;

export const NavigationBar : React.FC<NavigationBarProps> = (props) => {
    return (<StyledNavigationBar {...props}>
        {props.children}
    </StyledNavigationBar>)
};
