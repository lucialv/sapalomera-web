const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;

export const getPageInfo = async (slug: string) => {
  const res = await fetch(
    `${apiUrl}/${slug}&_fields=id,title,_links&_embed=wp:featuredmedia`,
  );

  if (!res.ok) throw new Error("Failed to fetch page info");

  const data = await res.json();
  return data;
};
