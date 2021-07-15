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

export type LinkType = {
    element: SVGElement,
    options: Array<{option: string, value: string}>
}