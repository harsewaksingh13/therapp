import * as React from "react";
import {PageProps} from "./pageProps";
import styled from "../styled"
import {Section, Spinner} from "..";
import {useAppState, useAppTheme} from "../../context/appContext";
import {SectionAlignment} from "../section/sectionProps";
import {AppState} from "../../../data/models/app";

const StyledPage = styled.section`
  height: 100%;
  width: 100%;
  align-content:center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: ${props => props.theme.backgroundColor};
`;

const Page: React.FC<PageProps> = (props) => {
    let appState = useAppState();
    let appTheme = useAppTheme();
    let appStateString = "Idle";
    let color = appTheme.primaryColor;
    if (appState === AppState.idle) {
        appStateString = "";
        color = "transparent"
    }
    if (appState === AppState.processing) {
        appStateString = "Processing";
        color = appTheme.primaryColor;
    }
    if (appState === AppState.loading) {
        appStateString = "Loading"
    }
    if (appState === AppState.done) {
        appStateString = "";
        color = "transparent"
    }
    return (
        <StyledPage {...props}>
            {props.children}
            <Section alignContent={SectionAlignment.CENTER}>
                <Spinner color={color}/>
                <h3>{appStateString}</h3>
            </Section>
        </StyledPage>
    )
};

export default Page