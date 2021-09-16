import type { EndpointOutput, Request } from "@sveltejs/kit";
import { ReportTemplateDAO } from "../../../utils/server/database/ReportTemplate.dao";
import { natsRequest } from "../../../utils/nats";

export async function post({body, params}: Request): Promise<EndpointOutput> {
    const data = JSON.parse(body.toString());
    const results = await ReportTemplateDAO.runReport(params.id, data.filterValues);
    // TODO: Make nats request to the service
    natsRequest("media-gen.img.create",
        {
            inputFile: data.inputFile,
            outputFile: data.outputFile,
            filterValues: results
        }
    )
    return {
        
    }
}
