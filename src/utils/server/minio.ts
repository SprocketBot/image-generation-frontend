
import {Client} from "minio";

import { minio } from "../../config.json";


export const mClient = new Client({
    endPoint: minio.endpoint,
    port: minio.port,
    useSSL: false,
    accessKey: minio.access,
    secretKey: minio.secret
});