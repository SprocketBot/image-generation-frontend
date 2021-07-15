import { writable } from "svelte/store";
import { TemplateLeafNode, BoundBox, LinkType } from "./types";

export const previewEl = writable<SVGElement>(undefined);
export const indicatorBounds = writable<BoundBox>({
    x: -100,
    y: -100,
    w: 0,
    h: 0
})
export const selectedEl = writable<SVGElement>(undefined);
export const selectedTemplateNode = writable<TemplateLeafNode>(undefined);

export const links = writable<Array<LinkType>>([]);
export const template = writable<any>({});