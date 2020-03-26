import * as React from "react";
import Page from "../page/page";
import {NavigationPageProps} from './navigationPageProps'
import {NavigationBar} from "..";




export const NavigationPage: React.FC<NavigationPageProps> = (props) => {
    return (
        <div>
            <NavigationBar/>
            <Page {...props}> {props.children} </Page>
        </div>
    )
};

