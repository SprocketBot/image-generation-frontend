
import {Client} from "minio";

import { minio } from "../../config";


export const mClient = new Client({
    endPoint: minio.endpoint,
    port: minio.port,
    useSSL: true,
    accessKey: minio.access,
    secretKey: minio.secret
});