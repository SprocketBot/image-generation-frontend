import type { EndpointOutput } from "@sveltejs/kit";
import { getNatsClient, natsRequest } from "../../../utils/nats";

export async function get(): Promise<EndpointOutput> {
    const types = await natsRequest("media-gen.image.templates");
    return {
        status: 200,
        body: JSON.stringify(types),
    }
    // return {
    //     status: 200,
    //     body: [
    //         { title: "Stars of the Week", id: "sotw", description: "Stats for top 5 players of last week" },
    //         { title: "Player Highlight", id: "player-highlight", desciption: "Detailed stats of one player" }
    //     ]
    // };
}