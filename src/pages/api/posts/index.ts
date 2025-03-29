import { getPageInfo } from "../../../lib/wp.ts";

export async function GET() {
  const posts = await getPageInfo("posts?page=1&per_page=4&_embed");

  const filteredPosts = await Promise.all(
    posts.map(async (post: any) => {
      let categories = [];
      const embeddedTerms = post._embedded?.["wp:term"]?.[0];

      if (embeddedTerms) {
        categories = await Promise.all(
          embeddedTerms.map(async (cat: any) => {
            if (cat.name) {
              return cat;
            } else if (cat.href) {
              const res = await fetch(cat.href);
              const catData = await res.json();
              return catData;
            }
            return null;
          }),
        );
        categories = categories.filter(Boolean);
        categories = categories.filter(
          (cat: any) => cat.slug !== "curs-2024-2025",
        );
        categories = categories.filter(
          (cat: any) => cat.slug !== "curs-2023-2024",
        );
      }

      // Se corrige la propiedad y se usa el índice 0
      const heroImageHref =
        post._links?.["wp:featuredmedia"]?.[0]?.href || null;
      let heroImageGuid = null;

      if (heroImageHref) {
        try {
          const imageRes = await fetch(heroImageHref);
          const imageData = await imageRes.json();
          heroImageGuid = imageData.guid?.rendered || null;
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }

      return {
        slug: post.id,
        title: post.title.rendered,
        heroImage: heroImageGuid,
        categories: categories.map((cat: any) => cat.name),
        date: post.date,
      };
    }),
  );

  return new Response(JSON.stringify(filteredPosts), {
    headers: { "Content-Type": "application/json" },
  });
}
