import { writable } from "svelte/store";
import type { BoundBox, ElementsMap, PropertiesMap } from "./types";

export const template = writable<any | undefined>(undefined);
export const svgData = writable<string>("");
export const imageType = writable<any>(undefined);
export const imageTypeId = writable<string>("");

export const previewEl = writable<SVGElement>(undefined);
export const indicatorBounds = writable<BoundBox>({
    x: -100,
    y: -100,
    w: 0,
    h: 0
})
export const selectedEl = writable<SVGElement>(undefined);
export const saving = writable<boolean>(false);
export const links = writable<ElementsMap>(new Map<SVGElement, PropertiesMap>());
export const fontElements = writable<Map<string, Element>>(new Map());