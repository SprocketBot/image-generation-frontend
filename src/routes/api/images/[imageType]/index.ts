import type { EndpointOutput, Response, Request } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const get = async ({ params }): Promise<EndpointOutput> => {
  const mClient = getClient();
  const { imageType } = params;
  try {
    const names = await new Promise<Array<string>>((resolve, reject) => {
      const output = [];
      console.log(`here with ${imageType}`)
      mClient.listObjects("svg-reports", `${imageType}/`)
        .on("data", d => {
          if (d.prefix) {
            output.push(d.prefix.split('/')[1]);
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
      body: names 
    }
  }
  catch {
    return {
      headers: {},
      status: 500,
    }
  }
}