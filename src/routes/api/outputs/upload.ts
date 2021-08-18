import type { Request, Response } from "@sveltejs/kit"
import { mClient } from "../../../utils/minio";


export const post = async ({body}: Request): Promise<Response> => {
    const data = JSON.parse(body);
    await mClient.putObject("svg-reports", `${data.reportType}/${data.reportName}`, data.svg)
    return {
        headers: {},
        status: 200,
        body: ""
    }
}