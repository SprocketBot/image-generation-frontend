import { browser } from "$app/env";
import { uploadProgress, downloadProgress } from "$src/stores";
import { FileManager } from "$src/utils/FileManager";

export async function getTemplate(id): Promise<any> {
    if (!browser) return {}
    return await fetch(`/api/imageTypes/${encodeURI(id)}`).then(r => r.json())
}

export async function getImageTypes(): Promise<any[]> {
    if (!browser) return []
    return await fetch(`/api/imageTypes`).then(r => r.json());
}


export async function uploadTemplate(svgHTML: string | SVGElement, reportType: string, reportName: string): Promise<any> {
    let svgHTMLstr: string;
    svgHTML instanceof SVGElement ? svgHTMLstr = svgHTML.outerHTML : svgHTMLstr = svgHTML;

    const res = await fetch(`/api/images/${reportType}/${reportName}`, { method: "POST" }).then(r => r.json())
    return await FileManager.uploadFile(res, new Blob([svgHTMLstr], {type:'image/svg+xml'}));
}

export async function downloadImage(filename: string): Promise<any> {
    if (!browser) return {}
    const res = await fetch(`/api/images/${filename}`).then(r => r.json());
    
    return await FileManager.downloadFile(res.url, res.size);
}