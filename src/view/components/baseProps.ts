import {ComponentStyle} from "./componentStyle";

export interface BaseProps<S extends ComponentStyle> {
    style?: S
}