export const friendlyLookup = {
    svg: "Root",
    g: "Group",
    rect: "Rectangle",
    text: "Text"
};
export const applicableOperations = {
    rect: ["image", "fill", "stroke"],
    polygon:["fill", "stroke"],
    text: ["text", "fill", "stroke"],
    image: ["image", "stroke"]
};

export const variableOperations = {
    text: ["text"],
    color: ["fill", "stroke"],
    image: ["image"]
}

export const variableForOperation = {
    fill: "color",
    stroke: "color",
    image: "image",
    text: "text"
}

export const optionTypes = {
    text: ["justify"],
    image: ["rescaleOn"],
    fill: [],
    stroke:[]
}

export const optionOptions = {
    "justify": ["left", "center", "right"],
    "rescaleOn": ["height", "width", "long", "short"]
}

export const selectableElements = Object.keys(applicableOperations);
export const hiddenElements = [
    "tspan",
    "defs"
]
