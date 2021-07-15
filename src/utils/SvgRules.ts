export const friendlyLookup = {
    svg: "Root",
    g: "Group",
    rect: "Rectangle",
    text: "Text"
};
export const applicableOperations = {
    rect: ["image", "fill", "stroke"],
    text: ["text", "fill", "stroke"],
    image: ["image", "stroke"]
};

export const variableForOperation = {
    fill: "color",
    stroke: "color",
    image: "image",
    text: "text"
}


export const selectableElements = Object.keys(applicableOperations);
export const hiddenElements = [
    "tspan",
    "defs"
]
