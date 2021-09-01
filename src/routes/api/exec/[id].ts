import type { EndpointOutput, Request } from "@sveltejs/kit";
import { ReportTemplateDAO } from "../../../utils/server/database/ReportTemplate.dao";

export async function post({body, params}: Request): Promise<EndpointOutput> {
    const data = JSON.parse(body.toString());
    const results = await ReportTemplateDAO.runReport(params.id, data.filterValues);
    // TODO: Make nats request to the service
    return {

    }
}
