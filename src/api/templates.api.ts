// TODO: Create an actual api endpoint for this
export async function getTemplate(name = "Star of the week"): Promise<any> {
    if (typeof window === "undefined") return {}
    return await fetch(`/api/template/${encodeURI(name)}`).then(r => r.json())
}


export async function uploadTemplate(svgHTML: string | SVGElement, reportType: string, reportName: string): Promise<any> {
    if(svgHTML instanceof SVGElement) {
        svgHTML = svgHTML.outerHTML;
    }
    const body = {
        svg: svgHTML,
        reportType,
        reportName,
    }
    return await fetch("/api/reports/upload", 
            {
                method: "POST",
                body: JSON.stringify(body),
            })
            .then(r => r.json())
}