import { browser } from "$app/env";
import { FileManager } from "$src/utils/FileManager";

export async function getTemplate(id): Promise<any> {
    if (!browser) return {}
    return await fetch(`/api/imageTypes/${encodeURI(id)}`).then(r => r.json())
}

export async function getImageTypes(): Promise<any[]> {
    if (!browser) return []
    return await fetch(`/api/imageTypes`).then(r => r.json());
}

export async function getImagesOfType(type): Promise<any[]> {
    if (!browser) return []
    return await fetch(`api/images/${type}`).then(r=>r.json());
}


export async function uploadTemplate(svg: SVGElement, reportType: string, reportName: string): Promise<any> {
    let svgStr = svg.outerHTML
    const res = await fetch(`/api/images/${reportType}/${reportName}`, { method: "POST" }).then(r => r.json())
    return await FileManager.uploadFile(res, new Blob([svgStr], {type:'image/svg+xml'}));
}

export async function downloadImage(reportType: string, filename:string): Promise<string> {
    if (!browser) return ""
    const res = await fetch(`/api/images/${reportType}/${filename}`).then(r => r.json());
    return await (await FileManager.downloadFile(res.getURL, res.size)).text();
}
