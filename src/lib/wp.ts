const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;

interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media?: number;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      href?: string;
    }>>;
  };
  _links?: {
    'wp:featuredmedia'?: Array<{ href: string }>;
    'wp:attachment'?: Array<{ href: string }>;
  };
}

interface ProcessedPost {
  title: string;
  pubDate: string;
  updatedDate: string;
  content: string;
  heroImage?: string;
  images: Array<{
    id: number;
    source_url: string;
    title: string;
  }>;
}

const cleanWordPressContent = (content: string): string => {
  // Eliminar shortcodes de WPBakery
  let cleaned = content.replace(/\[vc_row\]|\[\/vc_row\]|\[vc_column[^\]]*\]|\[\/vc_column\]|\[vc_column_text\]|\[\/vc_column_text\]|\[vc_gallery[^\]]*\]|\[\/vc_gallery\]|\[vc_single_image[^\]]*\]/g, '');
  
  // Eliminar espacios en blanco múltiples y saltos de línea innecesarios
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.replace(/^\s+|\s+$/g, '');
  
  // Convertir \n en párrafos
  cleaned = cleaned.split('\n\n')
    .filter(paragraph => paragraph.trim() !== '')
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join('');
    
  return cleaned;
};


export const getPageInfo = async (path: string): Promise<WordPressPost | WordPressPost[] | null> => {
  try {
    const res = await fetch(
      `${apiUrl}/${path}`,  
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch page info");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching WordPress data:', error);
    return null;
  }
};

export const processPost = async (post: WordPressPost): Promise<ProcessedPost> => {
  // Obtener todas las imágenes del post
  let images: Array<{ id: number; source_url: string; title: string }> = [];
  
  if (post._links?.['wp:attachment']) {
    const attachmentUrl = post._links['wp:attachment'][0].href;
    try {
      const res = await fetch(attachmentUrl);
      if (res.ok) {
        const attachments = await res.json();
        images = attachments.map((attachment: any) => ({
          id: attachment.id,
          source_url: attachment.source_url,
          title: attachment.title.rendered
        }));
      }
    } catch (error) {
      console.error('Error fetching attachments:', error);
    }
  }

  return {
    title: post.title.rendered || '',
    pubDate: post.date || '',
    updatedDate: post.modified || '',
    content: cleanWordPressContent(post.content.rendered) || '',
    heroImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    images
  };
};
