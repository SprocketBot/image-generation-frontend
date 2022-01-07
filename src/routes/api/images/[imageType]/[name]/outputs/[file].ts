import type { Request, Response } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio"

export const get = async ({ params }) => {
  const mClient = getClient();
  try {
    const { imageType, name, file } = params;
    const objectStats = await mClient.statObject('svg-reports', `${imageType}/${name}/outputs/${file}`); //this line checks that file exists
    const getURL:string = await mClient.presignedGetObject('svg-reports', `${imageType}/${name}/outputs/${file}`, 60 * 2)
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
    console.log(err)
    return {
      status: 500,
      body: err,
    }
  }
}