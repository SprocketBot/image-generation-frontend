import { browser } from "$app/env";
import { FileManager } from "$src/utils/FileManager";

export async function getOutputs(imageTypeId:string, filename:string): Promise<string[]> {
  if (!browser) return []
  return await fetch(`api/outputs/${imageTypeId}/${filename}`).then(r=>r.json());
}


export async function downloadOutputImage(reportType: string, projectName:string, filename:string): Promise<Blob> {
  if (!browser) return;
  const res = await fetch(`/api/outputs/${reportType}/${projectName}/${filename}`).then(r => r.json());
  return await FileManager.downloadFile(res.getURL, res.size);
}