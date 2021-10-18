import { browser } from "$app/env";
// TODO: Create an actual api endpoint for this
export async function getTemplate(id): Promise<any> {
    if (!browser) return {}
    return await fetch(`/api/imageTypes/${encodeURI(id)}`).then(r => r.json())
}

export async function getImageTypes(): Promise<any[]> {
    if (!browser) return []
    return await fetch(`/api/imageTypes`).then(r => r.json());
}


export async function uploadTemplate(svgHTML: string | SVGElement, reportType: string, reportName: string): Promise<any> {
    if (svgHTML instanceof SVGElement) {
        svgHTML = svgHTML.outerHTML;
    }
    const body = {
        svg: svgHTML,
        reportType,
        reportName,
    }
    return await fetch("/api/outputs/upload",
        {
            method: "POST",
            body: JSON.stringify(body),
        })
        .then(r => r.json())
}

export async function downloadImage(filename: string) : Promise<any> {
    if (!browser) return {}
    let res = await fetch(`/api/outputs/${filename}`).then(r => r.json());
    return res.blob;
}