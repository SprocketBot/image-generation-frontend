import type { EndpointOutput, Response, Request } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const get = async (): Promise<EndpointOutput> => {
  const mClient = getClient();
  try {
    const images = await new Promise<Array<string>>((resolve, reject) => {
      const output = [];
      mClient.listObjects("svg-reports",)
        .on("data", d => {
          if (d.prefix) {
            output.push(d.prefix.split('/')[0]);
          }
        })
        .on("end", () => resolve(output))
        .on("error", (e) => {
          reject(e)
        });
    })

    return {
      headers: {},
      status: 200,
      body: JSON.stringify(images)
    }
  }
  catch {
    return {
      headers: {},
      status: 500,
    }
  }
}