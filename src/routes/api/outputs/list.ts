import type { EndpointOutput, Request } from "@sveltejs/kit"
import { mClient } from "../../../utils/server/minio";

export const get = async ({ query }: Request): Promise<EndpointOutput> => {
    if (!query.has("reportCode")) {
        return {
            status: 400
        }
    }
    const reports = await new Promise<Array<unknown>>(resolve => {
        const output = [];
        mClient.listObjects("svg-reports", `${query.get("reportCode")}/`)
            .on("data", d => {
                if (d.name.endsWith(".svg")) {
                    output.push(d.name.split("/")[1])
                }
            })
            .on("end", () => resolve(output));
    })

    return {
        headers: {},
        status: 200,
        body: JSON.stringify(reports)
    }
}