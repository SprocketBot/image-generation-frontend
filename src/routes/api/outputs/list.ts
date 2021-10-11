import type { EndpointOutput, Request } from "@sveltejs/kit"
import { mClient } from "../../../utils/server/minio";

export const get = async ({ query }: Request): Promise<EndpointOutput> => {
    if (!query.has("reportCode")) {
        return {
            status: 400
        }
    }
    try {
        const reports = await new Promise<Array<unknown>>((resolve, reject) => {
            const output = [];
            mClient.listObjects("svg-reports", `${query.get("reportCode")}/`)
                .on("data", d => {
                    if (d.name && d.name.endsWith(".svg")) {
                        output.push(d.name.split("/")[1])
                    }
                })
                .on("end", () => resolve(output))
                .on("error", (e) => {
                    console.log(e);
                    reject(e)
                });
        })

        return {
            headers: {},
            status: 200,
            body: JSON.stringify(reports)
        }
    }
    catch {
        return {
            headers: {},
            status: 500,
        }
    }

    
}