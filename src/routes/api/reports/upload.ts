import type { Request, Response } from "@sveltejs/kit"
import { mClient } from "../../../utils/minio";


export const post = async ({body}: Request): Promise<Response> => {
    console.log(body);
    return {
        headers: {},
        status: 200,
        body: ""
    }
}