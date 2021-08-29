import { knexClient } from "../knex";
import type {ReportTemplate} from "./ReportTemplate.model";

export type ReportTemplateGetAll = Array<Omit<ReportTemplate, "templateStructure">>;

/**
 * Create Script:
 * | create table report_template
 * | (
 * |    template_structure jsonb not null,
 * |    report_code varchar(64)
 * |        constraint report_template_pk
 * |        primary key,
 * |    display_name text not null,
 * |    description text not null
 * | );
 * | create unique index report_template_template_structure_uindex
 * | on report_template (template_structure);
 */
class ReportTemplateDAO {
    recursed = false;
    
    async getAll(): Promise<ReportTemplateGetAll> {
        const results = await knexClient.select("report_code", "display_name", "description").from("report_template");
        
        return results as ReportTemplateGetAll;
    }

    async getByCode(reportCode: string): Promise<ReportTemplate> {
        const result = await knexClient.select("*").from("report_template")
            .where({report_code: reportCode});
        if (result.length) {
            return result[0] as ReportTemplate;
        }
        throw new Error(`No report with code ${reportCode} could be found.`);
    }

}
const reportTemplateDao = new ReportTemplateDAO();
export {reportTemplateDao as ReportTemplateDAO};