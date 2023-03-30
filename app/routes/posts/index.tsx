import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import getPosts from "~/models/posts.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};
export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return json<LoaderData>({ posts });
};

export default function PostRoute() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map(({ slug, title }) => {
          return (
            <li key={slug}>
              <Link to={slug} className="text-blue-600 underline">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
