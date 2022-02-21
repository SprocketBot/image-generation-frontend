export type SVGProperty = "text" | "fill" | "stroke" | "image"

export enum WorkState {
    Linking,
    Fonts,
    Saving
}
export type TemplateVariable = string
export type BoundBox = {
    w: number,
    h: number,
    x: number,
    y: number
}

export type OptionType = {
    name: string;
    display_name: string;
    options: string[];
    default: string;
}
export type OptionsRecord = Record<SVGProperty, OptionType[]>

export type TemplateLeafNode = {
    description: string,
    type: string
}

export type SprocketData = {
    varPath: TemplateVariable,
    options: { [key: string]: string }
    type: SVGProperty
}


export interface Filter {
    code: string;
    description: string;
    name: string;
    query: string;
}

export interface FilterValues extends Filter {
    data: any;
}

export interface ItemTypeQuery {
    filters: Filter[];
    query: string
}

export interface ImageTypeItem {
    display_name: string,
    report_code: string,
    description: string,
}

export interface ImageType extends ImageTypeItem {
    query: ItemTypeQuery;
    template_structure: any;
}

export type ElementsMap = Map<SVGElement, PropertiesMap>
export type PropertiesMap = Map<SVGProperty, SprocketData>