import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, getAllIds } from "../lib/fetch";
import { GET_BLOGS } from "../@types/types";
import Post from "../components/Post";
import { useEffect } from "react";

export interface STATICPROPS {
  posts: GET_BLOGS[];
}

const Top: React.FC<STATICPROPS> = ({ posts }) => {
  let filterdPosts = posts.sort(
    (
      a: { created_at: string | number | Date },
      b: { created_at: string | number | Date }
    ) => new Date(a.created_at) - new Date(b.created_at)
  );

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <div className="container lg:max-w-4xl md:mx-auto px-4 my-4 ">
        <h3 className="border-b">New</h3>
        <div className="lg:max-h-70">
          <div className="lg:flex">
            <div className="m-4 text-center">
              <Link href="/posts/[id]" as={`/posts/${filterdPosts[0].id}`}>
                <Image
                  src={filterdPosts[0].image}
                  alt="Picture of the author"
                  width={300}
                  height={300}
                  className="mr-4 cursor-pointer"
                />
              </Link>
            </div>
            <div className="m-3 lg:max-w-md">
              <Link href="/posts/[id]" as={`/posts/${filterdPosts[0].id}`}>
                <h2 className="my-3 cursor-pointer hover:underline">
                  {filterdPosts[0].title}
                </h2>
              </Link>

              <ul className="flex flex-row my-5">
                {filterdPosts[0].tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="border rounded-md bg-black text-xs text-white py-1 px-2 last:mr-0 mr-1"
                  >
                    <Link
                      href="/tag-filter-page/[name]"
                      as={`/tag-filter-page/${tag.name}`}
                      passHref
                    >
                      <a>{tag.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="h-30 line-clamp-3">{filterdPosts[0].content}</p>
              <Link
                href="/posts/[id]"
                as={`/posts/${filterdPosts[0].id}`}
                passHref
              >
                <a className="text-gray-500 inline-flex items-center mt-2 text-xs hover:underline cursor-pointer">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
              <p className="text-right text-xs my-2 text-opacity-70">
                {filterdPosts[0].created_at}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-4xl  md:mx-auto px-8">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-12 mx-auto">
            <div className="my-4 divide-y-2">
              {filterdPosts &&
                filterdPosts.map((post: GET_BLOGS) => (
                  <Post key={post.id} post={post} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Top;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
};
