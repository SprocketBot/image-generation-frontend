import {knexClient} from "../knex";
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

    async runReport(reportCode: string, reportFilters: Record<string, string>) {
        const template = await this.getByCode(reportCode);
        const {query} = template.query;
        const results = await knexClient.raw(query, reportFilters);
        if (!results.rows.length) throw new Error("No data returned from query!");
        const result = results.rows[0];
        if (!result?.data) throw new Error("Missing required property 'data' from report results");
        return result.data;
    }

    async getFilterValues(reportCode: string) {
        const template = await this.getByCode(reportCode);
        const filters = template.query.filters;
        const filterValues = await Promise.all(filters.map(async filter => {
            const results = await knexClient.raw(filter.query);
                
            return {
                name: filter.name,
                description: filter.description,
                code: filter.code,
                data: results.rows,
            };
        }));
        return filterValues;
        
    }
}
const reportTemplateDao = new ReportTemplateDAO();
export {reportTemplateDao as ReportTemplateDAO};
