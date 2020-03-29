import styled from "../styled";
import * as React from "react";

interface SpinnerProps {
    color?: string | ""
}

export const Spinner = (props : SpinnerProps) => (

    <StyledSpinner {...props} viewBox="0 0 50 50">
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
        />
    </StyledSpinner>
);

const StyledSpinner = styled.svg<SpinnerProps>`
  display: flex;
  animation: rotate 2s linear infinite;
  width: 100px;
  height: 50px;
  & .path {
    stroke: ${props => props.color || props.theme.primaryColor};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
