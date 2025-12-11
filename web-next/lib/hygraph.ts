import { GET_ARCHIVE, GET_POST_BY_SLUG, GET_TOOLS } from '../queries';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function fetchHygraph(query: string, variables?: any) {
    if (!HYGRAPH_ENDPOINT) throw new Error("NEXT_PUBLIC_HYGRAPH_ENDPOINT is not defined");

    const res = await fetch(HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error("Hygraph Error:", json.errors);
        throw new Error("Failed to fetch from Hygraph");
    }
    return json.data;
}

export async function getArticle(slug: string) {
    const data = await fetchHygraph(GET_POST_BY_SLUG, { slug });
    return data.post;
}

export async function getArchive() {
    const data = await fetchHygraph(GET_ARCHIVE);
    return data;
}

export async function getTools() {
    const data = await fetchHygraph(GET_TOOLS);
    return data.tools;
}
