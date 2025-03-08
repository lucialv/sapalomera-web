// components/PostsList.jsx
import { useState, useEffect } from "react";

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
              title: post.title,
              heroImage: post.heroImage,
            },
          })),
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ul>
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex flex-col gap-4 mb-4">
              <div className="skeleton h-52 w-52 rounded-lg"></div>
              <div className="skeleton h-4 w-28"></div>
            </li>
          ))
        : posts.map((post) => (
            <li className="flex flex-col gap-4 mb-2" key={post.slug}>
              <a href={`/blog/${post.slug}/`}>
                <img
                  className="rounded-lg w-52 h-52 mb-4 object-cover"
                  src={post.data.heroImage}
                  alt={post.data.title}
                  loading="lazy"
                />
                <h4 className="">{post.data.title}</h4>
              </a>
            </li>
          ))}
    </ul>
  );
}
