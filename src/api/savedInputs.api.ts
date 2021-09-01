import { browser } from "$app/env";

export async function getSavedInputs(reportCode: string): Promise<any[]> {
    if(!browser) return [];
    return fetch(`/api/outputs/list?reportCode=${reportCode}`).then(r => r.json())
}