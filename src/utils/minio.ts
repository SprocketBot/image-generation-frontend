
import {Client} from "minio";

//TODO: Don't commit this
import { access, secret } from "../config.json";


export const mClient = new Client({
    endPoint: "clyde",
    port: 777,
    useSSL: false,
    accessKey: access,
    secretKey: secret
});