import {BaseProps} from "../baseProps";
import {ComponentStyle} from "../componentStyle";

export interface LabelStyle extends ComponentStyle {
    textColor?: string
}

export interface LabelProps extends BaseProps<LabelStyle> {
    text?: string
}