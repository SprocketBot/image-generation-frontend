import type { Request } from "@sveltejs/kit";
import type { Response } from "@sveltejs/kit"
import { mClient } from "../../../utils/minio";

export const get = async ({ params }: Request) => {
    //TODO: make this use params and catch errors if file doesn't exist
    const imageType = await new Promise<unknown>((resolve) => {
        let output = "";
        mClient.getObject("svg-reports", "sotw/sotw.json", function (err, dataStream) {
            dataStream.on('data', (chunk) => output += chunk)
            dataStream.on('end', () => resolve(output));
        })
    })

    return {
        body:imageType
    }
}