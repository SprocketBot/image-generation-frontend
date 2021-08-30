import type { Request, EndpointOutput } from "@sveltejs/kit";
import { ReportTemplateDAO } from "../../../utils/server/database/ReportTemplate.dao";

export const get = async ({ params }: Request): Promise<EndpointOutput> => {
    const values = await ReportTemplateDAO.getFilterValues(params.id);

    return {
        status: 200,
        body: JSON.stringify(values),
    }
}