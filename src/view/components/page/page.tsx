import * as React from "react";
import {PageProps} from "./pageProps";
import styled from "../styled"

const StyledPage = styled.section`
  padding: 2em 10em 20em 8em;
  height: 100vh,
  width: 100vh,
  display: flex;
  flex-wrap: wrap;
  background: ${props => props.theme.backgroundColor};
`;

const Page: React.FC<PageProps> = (props) => {
    return (
        <StyledPage {...props}>
            {props.children}
        </StyledPage>
    )
};

export default Page