import * as React from "react";
import {PageProps} from "./pageProps";

import {useAppState} from "../../context/appContext";

import {AppState} from "../../../data/models/app";
import {LabelHeader} from "../label/label";
import {makeStyles} from "@material-ui/core/styles";
import {LinearProgress} from "@material-ui/core";
import {Section} from "..";



const useLinearStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: 2,
        },
    },
}));

const Page: React.FC<PageProps> = (props) => {
    let appState = useAppState();
    let loading = appState === AppState.processing || appState === AppState.loading;
    const linearStyle = useLinearStyles();
    return (
        <Section {...props}  >
            { loading && <LinearProgress className={linearStyle.root} color="secondary"/>}
            <LabelHeader text={props.pageTitle}/>
            {props.children}
        </Section>
    )
};

export default Page