import React from "react";
import { useState, useEffect } from "react";
import he from "he";

const baseUrl = "https://sapalomera.lucia-dev.com";

interface Post {
  slug: string;
  title: string;
  heroImage: string;
  categories: string[];
  date: string;
  excerpt: string;
}

interface ProcessedPost {
  slug: string;
  data: {
    title: string;
    heroImage: string;
    categories: string[];
    date: string;
    excerpt: string;
  };
}

const cleanExcerpt = (excerpt: string): string => {
  if (!excerpt) return '';
  
  // Eliminar shortcodes de WPBakery y WordPress
  let cleaned = excerpt;
  
  // Eliminar shortcodes con atributos
  cleaned = cleaned.replace(/\[[^\]]+\]/g, '');
  
  // Eliminar shortcodes simples que puedan quedar
  cleaned = cleaned.replace(/\[\/?[^\]]+\]/g, '');
  
  // Eliminar tags HTML
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Decodificar entidades HTML
  cleaned = he.decode(cleaned);
  
  // Eliminar caracteres especiales y símbolos extraños
  cleaned = cleaned.replace(/[\u2018\u2019]/g, "'") // Comillas simples curvas
             .replace(/[\u201C\u201D]/g, '"') // Comillas dobles curvas
             .replace(/\u2026/g, '...') // Puntos suspensivos
             .replace(/&nbsp;/g, ' ') // Espacios HTML
             .replace(/\[\s*\.\.\.\s*\]/, '...'); // [...] por ...
  
  // Eliminar espacios múltiples y trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
};

export default function PostsList(): React.ReactElement {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${baseUrl}/api/posts`)
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(
          data.map((post) => ({
            slug: post.slug,
            data: {
              title: he.decode(post.title),
              heroImage: post.heroImage,
              categories: post.categories,
              date: post.date,
              excerpt: post.excerpt || '',
            },
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-center justify-items-center lg:justify-normal">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <div className="h-52 w-full bg-gray-300 animate-pulse"></div>
              </figure>
              <div className="card-body min-h-[140px]">
                <h2 className="card-title flex items-center justify-between">
                  <div className="h-4 w-28 bg-gray-300 animate-pulse"></div>
                </h2>
                <p className="h-4 w-full bg-gray-300 animate-pulse"></p>
                <div className="card-actions justify-end">
                  {index === 0 && (
                    <div className="badge badge-secondary w-12 bg-gray-300 animate-pulse mr-auto"></div>
                  )}
                  <div className="badge badge-outline bg-gray-300 animate-pulse"></div>
                  <div className="badge badge-outline bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            </li>
          ))
        : posts.map((post) => (
            <li key={post.slug} className="card bg-base-100 w-96 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <a href={`/noticies/${post.slug}/`} className="h-full flex flex-col">
                <figure className="overflow-hidden">
                  <img
                    src={post.data.heroImage}
                    alt={post.data.title}
                    className="w-full h-52 object-cover rounded-t-xl"
                    loading="lazy"
                  />
                </figure>
                <div className="card-body flex flex-col flex-1 min-h-[200px]">
                  <div className="flex-1">
                    <h2 className="card-title text-lg font-semibold mb-2 line-clamp-2">
                      {post.data.title}
                    </h2>
                    {post.data.excerpt && post.data.excerpt.length > 0 && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.data.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="card-actions flex items-center mt-auto">
                    {post.slug === posts[0].slug && (
                      <div className="badge badge-secondary">Nou</div>
                    )}
                    <div className="flex flex-wrap gap-2 ml-auto">
                      {post.data.categories.map((category) => (
                        <div className="badge badge-outline" key={category}>
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
    </ul>
  );
} 