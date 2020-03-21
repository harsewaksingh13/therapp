import {ComponentStyle} from "../../data/models/theme";

export interface BaseProps<S extends ComponentStyle> {
    style?: S
}