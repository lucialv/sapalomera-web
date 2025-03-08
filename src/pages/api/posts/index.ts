import { getPageInfo } from "../../../lib/wp.ts";

export async function GET() {
  const posts = await getPageInfo(
    "posts?page=1&per_page=3&_fields=id,title,_links&_embed=wp:featuredmedia",
  );

  const filteredPosts = posts.map((post: any) => ({
    slug: post.id,
    title: post.title.rendered,
    heroImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
  }));

  return new Response(JSON.stringify(filteredPosts), {
    headers: { "Content-Type": "application/json" },
  });
}
