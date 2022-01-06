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
    let svgHTMLstr: string;
    svgHTML instanceof SVGElement ? svgHTMLstr = svgHTML.outerHTML : svgHTMLstr = svgHTML;
    // if (svgHTML instanceof SVGElement) {
    //     svgHTMLstr = svgHTML.outerHTML;
    // }
    const body = {
        //svg: svgHTML,
        reportType,
        reportName,
    }
    console.log(body);
    const res = await fetch("/api/outputs/upload",
        {
            method: "POST",
            body: JSON.stringify(body),
        })
         .then(r => r.json())
    
    console.log(res);
    //console.log(await fetch(res));
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
        console.log("UPLOAD SUCCESSFUL");
        }
        else {
        console.log("UPLOAD FAILED");
        }
    }
    };

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            console.log(e.loaded / svgHTMLstr.length);
        }
    };

    xhr.open("PUT", res);
    xhr.send(svgHTMLstr);
        return
    }

export async function downloadImage(filename: string) : Promise<any> {
    if (!browser) return {}
    const res = await fetch(`/api/outputs/${filename}`).then(r => r.json());
    return res.blob;
}