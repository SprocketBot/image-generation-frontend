import { browser } from "$app/env";
import { FileManager } from "$src/utils/FileManager";
import { handleApiResponse } from "./common.api";

export async function getTemplate(id: string): Promise<any> {
    if (!browser) return {}
    return handleApiResponse<any>(await fetch(`/api/imageTypes/${encodeURI(id)}`));
}

export async function getImageTypes(): Promise<string[]> {
    if (!browser) return []
    return handleApiResponse<string[]>(await fetch(`/api/imageTypes`));
}

export async function getImagesOfType(type: string): Promise<string[]> {
    if (!browser) return []
    return handleApiResponse<string[]>(await fetch(`api/images/${type}`))
}


export async function uploadTemplate(svg: SVGElement, reportType: string, reportName: string): Promise<any> {
    const svgStr = svg.outerHTML
    const res = await handleApiResponse<string>(await fetch(`/api/images/${reportType}/${reportName}`, { method: "POST" }))
    return await FileManager.uploadFile(res, new Blob([svgStr], { type: 'image/svg+xml' }));
}

export async function downloadImage(reportType: string, filename: string): Promise<string> {
    if (!browser) return ""
    const res = await handleApiResponse<any>(await fetch(`/api/images/${reportType}/${filename}`));
    return await (await FileManager.downloadFile(res.getURL, res.size)).text();
}
