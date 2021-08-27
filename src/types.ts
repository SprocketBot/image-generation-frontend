export type SVGProperty = "text" | "fill" | "stroke" | "image"

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
    options: {[key: string]: string}
    type: SVGProperty
}

export type ImageTypeItemType = {
    display_name: string,
    report_code: string,
    description: string,
}

export type ElementsMap = Map<SVGElement, PropertiesMap>
export type PropertiesMap = Map<SVGProperty, SprocketData>