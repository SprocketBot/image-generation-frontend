import type { Request, EndpointOutput } from "@sveltejs/kit";
import { mClient } from "../../../utils/minio";
import { natsRequest } from "../../../utils/nats";

export const get = async ({ params }: Request): Promise<EndpointOutput> => {
    // //TODO: make this use params and catch errors if file doesn't exist
    // const imageType = await new Promise<unknown>((resolve, reject) => {
    //     let output = "";
        
    //     mClient.getObject("svg-reports", `${params.id}/${params.id}.json`, function (err, dataStream) {
    //         if (err) {
    //             reject(err)
    //         }
    //         dataStream?.on('data', (chunk) => output += chunk)
    //         dataStream?.on('end', () => resolve(output));
    //     })
    // })
    const imageType = await natsRequest("media-gen.image.template", {reportCode: params.id})
    return {
        status: 200,
        body: JSON.stringify(imageType),
    }
}