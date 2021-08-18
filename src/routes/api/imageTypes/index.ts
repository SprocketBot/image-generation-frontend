import type { EndpointOutput } from "@sveltejs/kit";

export async function get(): Promise<EndpointOutput> {
    return {
        status: 200,
        body: [{title: "Star of the Week", id: "sotw"}]
    };
}