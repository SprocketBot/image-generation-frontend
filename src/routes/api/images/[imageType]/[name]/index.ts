import type { EndpointOutput, Response, Request } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const get = async ({ params }): Promise<EndpointOutput> => {
  const mClient = getClient();
  const { imageType, name } = params;
  try {
    const filenames = await new Promise<Array<string>>((resolve, reject) => {
      const output = [];
      mClient.listObjects("svg-reports", `${imageType}/${name}/`)
        .on("data", d => {
          if (d.name) {
            output.push(d.name.split("/")[2])
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
      body: JSON.stringify(filenames)
    }
  }
  catch {
    return {
      headers: {},
      status: 500,
    }
  }
}

export const post = async ({ params }): Promise<Response> => {
  const mClient = getClient();
  const { imageType, name } = params;
  try {
    const result = await mClient.presignedPutObject("svg-reports", `${imageType}/${name}/template.svg`, 60 * 2)
    return {
      headers: {},
      status: 200,
      body: JSON.stringify(result)
    }
  }
  catch {
    return {
      headers: {},
      status: 500,
    }
  }
}