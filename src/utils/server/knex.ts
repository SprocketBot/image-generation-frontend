import KnexClient from "knex";
import config from "../../config.json";
import {readFileSync} from "fs";
console.log(config.knex)

export const knexClient = KnexClient({
    client: "pg",
    connection: {
        ...config.knex,
        ssl: {
            rejectUnauthorized: false,
            ca: readFileSync("./ca-certificate.cer")
        }
    },
    asyncStackTraces: true,
    debug: true,
    pool: {
        min: 2,
        max: 2
    },
})