import type {OptionsRecord} from "src/types";

export const friendlyLookup = {
    svg: "Root",
    g: "Group",
    rect: "Rectangle",
    text: "Text",
    path: "Vector",
};
export const applicableOperations = {
    rect: ["image", "fill", "stroke"],
    polygon: ["fill", "stroke"],
    text: ["text", "fill", "stroke"],
    image: ["image", "stroke"],
    path: ["fill", "stroke"],
};

export const variableOperations = {
    text: ["text"],
    color: ["fill", "stroke"],
    image: ["image"],
};

export const variableForOperation = {
    fill: "color",
    stroke: "color",
    image: "image",
    text: "text",
};

export const optionTypes: OptionsRecord = {
    text: [
        {
            name: "h-align",
            display_name: "Horizontal Alignment",
            options: ["left", "center", "right"],
            default: "center",
        },
        {
            name: "v-align",
            display_name: "Vertical Alignment",
            options: ["baseline", "center", "hanging"],
            default: "center",
        },
    ],
    image: [
        {
            name: "rescaleOn",
            display_name: "Rescale Image On",
            options: ["height", "width", "long", "short"],
            default: "height",
        },
    ],
    fill: [],
    stroke: [],
};

export const selectableElements = Object.keys(applicableOperations);
export const hiddenElements = [
    "tspan",
    "defs",
];
