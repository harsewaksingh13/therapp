import * as React from "react";
import {PageProps} from "./pageProps";

const Page: React.FC<PageProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
};

export default Page