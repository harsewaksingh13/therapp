import * as React from "react";
import Page from "../page/page";
import NavigationBar from "../navigationBar/navigationBar";
import {NavigationPageProps} from './navigationPageProps'




const NavigationPage: React.FC<NavigationPageProps> = (props) => {
    return (
        <div>
            <NavigationBar/>
            <Page>{props.children} </Page>
        </div>
    )
};

export default NavigationPage