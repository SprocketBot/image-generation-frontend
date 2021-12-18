import type { Request, Response } from "@sveltejs/kit"
import { getClient } from "../../../../../utils/server/minio"

export const get = async ({ params }) => {
  const mClient = getClient();
  try {
    const { imageType, filename } = params;
    const imgBuffer:Buffer = await new Promise((res, rej) => {
      mClient.getObject('svg-reports', `${imageType}/output/${filename}`, function (err, dataStream) {
        const bufs:Buffer[] = [];
        if (err) {
          rej(err)
        }
        dataStream.on('data', function(chunk) {
          bufs.push(chunk);
        })
        dataStream.on('end', function() {
          res(Buffer.concat(bufs));
        })
        dataStream.on('error', function(err) {
          rej(err)
        })
      })
    })
    return {
      status: 200,
      body: JSON.stringify({ blob: imgBuffer.toString("base64") })
    }
  } catch {
    return {
      status: 500, //TODO: more meaningful errors : file not found? downloading error?
    }
  }
}