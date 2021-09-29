import {connect, NatsConnection, PublishOptions, JSONCodec, createInbox} from "nats";
import { v4 } from "uuid";
import config  from "../config.json"
let client: NatsConnection | undefined;

export async function getNatsClient() {
    if(client) return client;
    client = await connect({servers: config.transport.url, name: config.transport.queue});
    return client;
}

export async function natsRequest(subject: string, data: Record<string, unknown> = {}, options: PublishOptions = {}): Promise<unknown> {
    if (!subject.startsWith(config.transport.scope)) subject = config.transport.scope + "." + subject
    
    if (!client) await getNatsClient();
    
    let res, rej;
    
    const response = new Promise((a,b)=> {
        res = a;
        rej = b;
        setTimeout(() => rej("Request Timed Out."), 15000);
    });

    const reply = createInbox();
    const subscription = client.subscribe(reply, {
        callback: (err, msg) => {
            subscription.unsubscribe();
            if(err) {
                rej(err);
                return;
            } else {
                const decodedData = new TextDecoder().decode(msg.data);
                try {
                    const d = JSON.parse(decodedData)
                    res(d.response);
                } catch (e) {
                    rej(new Error(decodedData))
                }
                
            }
        },
        max: 1
    });
    
    const serializedData = JSONCodec().encode({
        data,
        id: v4()
    });
    
    await client.publish(subject, serializedData, {
        ...options,
        reply,
    })
    return await response;
}