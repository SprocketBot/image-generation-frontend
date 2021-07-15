// TODO: Create an actual api endpoint for this
export async function getTemplate(name = "Star of the week"): Promise<any> {
    if (typeof window === "undefined") return {}
    return await fetch(`/api/template/${encodeURI(name)}`).then(r => r.json())
}