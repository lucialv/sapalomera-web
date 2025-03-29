import { getPageInfo } from "@/lib/wp.ts";

export async function GET() {
  const postsData = await getPageInfo("posts?page=1&per_page=4&_embed");
  
  if (!postsData || !Array.isArray(postsData)) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const filteredPosts = await Promise.all(
    postsData.map(async (post: any) => {
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

      const heroImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      // Procesar el excerpt aquí para asegurarnos de que está limpio
      let excerpt = post.excerpt?.rendered || '';
      // Eliminar shortcodes de WPBakery
      excerpt = excerpt.replace(/\[.*?\]/g, '');
      // Eliminar tags HTML
      excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, '');
      // Decodificar entidades HTML
      excerpt = excerpt.replace(/&[^;]+;/g, ' ');
      // Limpiar espacios múltiples
      excerpt = excerpt.replace(/\s+/g, ' ').trim();

      return {
        slug: post.id,
        title: post.title.rendered,
        heroImage: heroImageUrl,
        categories: categories.map((cat: any) => cat.name),
        date: post.date,
        excerpt: excerpt,
      };
    }),
  );

  return new Response(JSON.stringify(filteredPosts), {
    headers: { "Content-Type": "application/json" },
  });
}
