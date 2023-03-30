import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import getPosts from "~/models/posts.server";

export const loader = async () => {
  const posts = await getPosts();

  return json({ posts });
};

export default function PostRoute() {
  const { posts } = useLoaderData();

  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.slug}>
              <Link to={post.slug} className="text-blue-600 underline">
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}