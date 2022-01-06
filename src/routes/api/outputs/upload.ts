import type { Request, Response } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const post = async ({body}: Request): Promise<Response> => {
    console.log("hit");
    console.log(body);
    const mClient = getClient();
    const data = JSON.parse(body);
    console.log(data);
    try {
        //expires in 5 minutes
        const result = await mClient.presignedPutObject("svg-reports", `${data.reportType}/${data.reportName}`, 60 * 5)
        console.log(result);
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