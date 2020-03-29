import * as React from "react";
import {SectionAlignment, SectionDirection, SectionProps} from "./sectionProps";
import styled from "../styled";


const StyledSection = styled.section<SectionProps>`
  width : ${props => props.style?.width};
  height: ${props => props.style?.height};
  padding: ${props => props.style?.padding};
  margin: ${props => props.style?.margin};
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction || SectionDirection.COLUMN};
  align-items: ${props => props.alignItems || SectionAlignment.START};
  align-content: ${props => props.alignContent || SectionAlignment.START};
  background: ${props => props.style?.backgroundColor || props.theme.transparent}
`;


export const Section: React.FC<SectionProps> = (props) => {
    return (<StyledSection {...props} > {props.children} </StyledSection>)
};

