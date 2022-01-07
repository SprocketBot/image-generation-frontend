import type { Request, Response } from "@sveltejs/kit"
import { getClient } from "$utils/server/minio";

export const post = async ({body}: Request): Promise<Response> => {
    const mClient = getClient();
    const data = JSON.parse(body.toString());
    console.log(data);
    try {
        const result = await mClient.presignedPutObject("svg-reports", `${data.reportType}/${data.reportName}`, 60 * 2)
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