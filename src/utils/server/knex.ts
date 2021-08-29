import KnexClient from "knex";
import config from "../../config.json";

export const knexClient = KnexClient({
    client: "pg",
    connection: {
        ...config.knex
    }
})