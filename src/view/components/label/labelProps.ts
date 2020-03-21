import {BaseProps} from "../baseProps";
import {ComponentStyle} from "../../../data/models/theme";

export interface LabelProps extends BaseProps<ComponentStyle> {
    text?: string
}