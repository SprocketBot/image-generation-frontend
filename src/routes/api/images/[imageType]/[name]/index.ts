import type { EndpointOutput, Response, Request } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const get = async ({ params, url }): Promise<EndpointOutput> => {
  const mClient = getClient();
  const { imageType, name } = params;
  try {
    const objectStats = await mClient.statObject('svg-reports', `${imageType}/${name}/template.svg`); //this line checks that file exists
    const getURL:string = await mClient.presignedGetObject('svg-reports', `${imageType}/${name}/template.svg`, 60 * 2)
    return {
      status: 200,
      body: JSON.stringify(
        {
          getURL,
          size: objectStats.size 
        }
      )
    }
  } catch (err) {
    return {
      status: 500,
      body: err,
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