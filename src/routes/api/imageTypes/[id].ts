import type { Request } from "@sveltejs/kit";
import type { Response } from "@sveltejs/kit"
import { mClient } from "../../../utils/minio";

export const get = async ({ params }: Request) => {
    //TODO: make this use params and catch errors if file doesn't exist
    const imageType = await new Promise<unknown>((resolve, reject) => {
        let output = "";
        
        mClient.getObject("svg-reports", `${params.id}/${params.id}.json`, function (err, dataStream) {
            if (err) {
                console.log(err);
                reject(err)
            }
            dataStream?.on('data', (chunk) => output += chunk)
            dataStream?.on('end', () => resolve(output));
        })
    })
    return {
        body:imageType
    }
}