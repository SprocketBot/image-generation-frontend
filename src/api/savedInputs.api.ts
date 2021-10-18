import { browser } from "$app/env";

export async function getSavedInputs(reportCode: string): Promise<any[]> {
    if (!browser) return [];
    let response = await fetch(`/api/outputs/list?reportCode=${reportCode}`);
    return new Promise((res, rej) => {
        if (response.status !== 200) {
            rej();
        }
        res(response.json());
    })
}