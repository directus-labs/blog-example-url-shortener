import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { directus } from "./util/directus";
import { readItems, updateItem } from "@directus/sdk";
import { useEffect, useState } from "react";

interface ShortLink {
  clicks: number;
  date_created?: string;
  date_updated?: string;
  id: number;
  slug: string;
  sort?: null;
  url: string;
  user_created?: string;
  user_updated?: null;
}

function App() {
  return (
    <>
      <h1>Link Shortener</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/:slug" element={<LinkRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function LinkRoute() {
  const { slug } = useParams();
  const [slugError, setSlugError] = useState("");

  useEffect(() => {
    // Perform data fetching based on slug
    async function fetchShortLink() {
      try {
        const data = await directus.request(readItems("short_link"));

        const slug_data = data
          .map((y) => y)
          .filter((z) => z.slug.toLowerCase().includes(slug));

        if (!slug_data || slug_data?.length === 0) {
          setSlugError(`Invalid Slug: Couldn't find the record →→ ${slug}`);
          throw new Error("Invalid Slug: Couldn't find that record");
        }
        const shortLink = slug_data[0] as ShortLink;

        await directus.request(
          updateItem("short_link", shortLink.id, {
            clicks: shortLink.clicks + 1,
          })
        );

        window.location.assign(`${shortLink.url}`);
      } catch (error) {
        console.log(error);
      }
    }

    fetchShortLink();
  }, [slug]);

  return <>{slugError && <h1 style={{ color: "red" }}>{slugError}</h1>}</>;
}

export default App;
