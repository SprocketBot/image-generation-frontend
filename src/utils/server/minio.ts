
import {Client} from "minio";

import { minio } from "../../config.json";


export const mClient = new Client({
    endPoint: "clyde",
    port: 777,
    useSSL: false,
    accessKey: minio.access,
    secretKey: minio.secret
});