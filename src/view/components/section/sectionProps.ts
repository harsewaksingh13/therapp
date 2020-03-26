import {BaseProps} from "../baseProps";
import {ComponentStyle} from "../../../data/models/theme";
export interface SectionStyle extends ComponentStyle {

}

export interface SectionProps extends BaseProps<SectionStyle> {
    direction? : SectionDirection
    alignItems? : SectionAlignment
    alignContent? : SectionAlignment
}

export enum SectionDirection {
    COLUMN = "column",
    ROW = "row"
}

export enum SectionAlignment {
    STRETCH= "stretch",
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    START = "flex-start",
    END = "flex-end",
    //used with align-content
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around"
}