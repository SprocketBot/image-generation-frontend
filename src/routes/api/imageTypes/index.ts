import type { EndpointOutput } from "@sveltejs/kit";

export async function get(): Promise<EndpointOutput> {
    return {
        status: 200,
        body: [
            { title: "Stars of the Week", id: "sotw", description: "Stats for top 5 players of last week" },
            { title: "Player Highlight", id: "player-highlight", desciption: "Detailed stats of one player" }
        ]
    };
}