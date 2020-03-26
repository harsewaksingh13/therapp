import {BaseProps} from "../baseProps";
import {ComponentStyle} from "../../../data/models/theme";

interface LabelStyle extends ComponentStyle {
    textColor?: string
}

export interface LabelProps extends BaseProps<LabelStyle> {
    text?: string
}