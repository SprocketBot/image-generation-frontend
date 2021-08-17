import type { Response } from "@sveltejs/kit"
import { mClient } from "../../../utils/minio";


export const get = async (): Promise<Response> => {
    

    const reports = await new Promise<Array<unknown>>(resolve => {
        const output = [];
        mClient.listObjects("svg-reports").on("data", d => output.push(d.name)).on("end", () => resolve(output));
    })

    return {
        headers: {},
        status: 200,
        body: JSON.stringify(reports)
    }
}