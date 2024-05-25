import { createDirectus, staticToken, rest } from "@directus/sdk";

const directusToken = import.meta.env.VITE_DIRECTUS_API_TOKEN;
const directusUrl = import.meta.env.VITE__DIRECTUS_URL;

if (!directusToken) {
  throw new Error("Please include a Token");
}

if (!directusUrl) {
  throw new Error("Please include a Url");
}

export const directus = createDirectus(directusUrl)
  .with(staticToken(directusToken))
  .with(rest());

// const request = await client.request(
//     withToken('TOKEN', readItems('collection'))
//   );
