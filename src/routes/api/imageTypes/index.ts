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
    //         { display_name: "Stars of the Week", report_code: "sotw", description: "Stats for top 5 players of last week" },
    //         { display_name: "Player Highlight", report_code: "player-highlight", description: "Detailed stats of one player" }
    //     ]
    // };
}