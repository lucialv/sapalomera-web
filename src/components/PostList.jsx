// components/PostsList.jsx
import { useState, useEffect } from "react";
import he from "he";
const baseUrl = import.meta.env.SITE || "http://localhost:4321";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/api/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(
          data.map((post) => ({
            slug: post.slug,
            data: {
              title: he.decode(post.title),
              heroImage: post.heroImage,
              categories: post.categories,
              data: post.date,
            },
          })),
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
            <li key={post.slug} className="card bg-base-100 w-96 shadow-sm">
              <a href={`/blog/${post.slug}/`}>
                <figure>
                  <img
                    src={post.data.heroImage}
                    alt={post.data.title}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                </figure>
                <div className="card-body min-h-[140px]">
                  <h2 className="card-title flex items-center justify-between">
                    {post.data.title}
                  </h2>
                  <div className="card-actions justify-end">
                    {post.slug === posts[0].slug && (
                      <div className="badge badge-secondary mr-auto">Nou</div>
                    )}
                    {post.data.categories.map((category) => (
                      <div className="badge badge-outline" key={category}>
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </li>
          ))}
    </ul>
  );
}
