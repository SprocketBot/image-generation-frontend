import { browser } from "$app/env";

export async function getOutputs(imageTypeId, filename): Promise<any[]> {
  if (!browser) return []
  return await fetch(`api/outputs/${imageTypeId}/${filename}`).then(r=>r.json());
}