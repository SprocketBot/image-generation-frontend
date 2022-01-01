import type { EndpointOutput, Request } from "@sveltejs/kit";
import { ReportTemplateDAO } from "$utils/server/database/ReportTemplate.dao";
import { rmqRequest } from "$utils/rabbitmq";

export async function post({body, params}: Request): Promise<EndpointOutput> {
    const data = JSON.parse(body.toString());
    const results = await ReportTemplateDAO.runReport(params.id, data.filterValues);

    try {
        await rmqRequest("media-gen.img.create",
            {
                inputFile: data.inputFile,
                outputFile: data.outputFile,
                filterValues: results
            }
        )
        return {
            status: 200
        }
    } catch (err) {
        console.log(err)
        return {
            status: 500
        }
    }
}
