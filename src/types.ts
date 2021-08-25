export type SVGProperty = "text" | "fill" | "stroke" | "image"
//export type OperationType = ""
export type TemplateVariable = string
export type BoundBox = {
    w: number,
    h: number,
    x: number,
    y: number
}

export type TemplateLeafNode = {
    description: string,
    type: string
}

export type SproketData = {
    varPath: TemplateVariable,
    type: SVGProperty
}

export type ImageTypeItemType = {
    display_name: string,
    report_code: string,
    description: string,
}

export type ElementsMap = Map<SVGElement, PropertiesMap>
export type PropertiesMap = Map<SVGProperty, TemplateVariable>