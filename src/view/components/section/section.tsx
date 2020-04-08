import * as React from "react";
import {SectionAlignment, SectionDirection, SectionProps} from "./sectionProps";
import {makeStyles} from "@material-ui/core/styles";
import {ComponentStyle} from "../componentStyle";
import {Container} from "@material-ui/core";


// const StyledSection = styled.section<SectionProps>`
//   width : ${props => props.style?.width};
//   height: ${props => props.style?.height};
//   padding: ${props => props.style?.padding};
//   margin: ${props => props.style?.margin};
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: ${props => props.direction || SectionDirection.COLUMN};
//   align-items: ${props => props.alignItems || SectionAlignment.START};
//   align-content: ${props => props.alignContent || SectionAlignment.START};
//   background: ${props => props.style?.backgroundColor || props.theme.palette.transparent}
// `;

export const useStyles = makeStyles((theme) => ({

    root: (style: ComponentStyle) => (
        {
            background:  theme.palette.background.default,
            width: style?.width,
            height: style?.height,
            margin: style?.margin,
            display: "flex",
            flexWrap: "wrap",
            flexDirection:"column",
            alignItems:"center",
            marginTop:"10%"
        })

}));

export const Section: React.FC<SectionProps> = (props) => {
    const styles = useStyles(props);
    return (<Container {...props}  className={styles.root} > {props.children} </Container>)
};

