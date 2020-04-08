import {BaseProps} from "../baseProps";
import {ComponentStyle} from "../componentStyle";
import {SectionAlignment, SectionDirection} from "../section/sectionProps";

export interface PageProps extends BaseProps<ComponentStyle>{
    pageTitle?: string
    direction? : SectionDirection
    alignItems? : SectionAlignment
    alignContent? : SectionAlignment
} 
