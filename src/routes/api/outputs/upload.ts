import type { Request, Response } from "@sveltejs/kit"
import { getClient } from "../../../utils/server/minio";

export const post = async ({body}: Request): Promise<Response> => {
    const mClient = getClient();
    const data = JSON.parse(body);
    try {
        let result = await mClient.putObject("svg-reports", `${data.reportType}/${data.reportName}`, data.svg)
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