import type { NextPage } from "next";
import Head from "next/head";

import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/fetch";
import { GET_BLOGS, TAG } from "../@types/types";
import Post from "../components/Post";
import useSWR from "swr";
import { useEffect } from "react";
import type { SWRConfiguration } from "swr";
export interface STATICPROPS {
  posts: GET_BLOGS[];
}

const fetcher = (url: any) => fetch(url).then((res) => res.json);
const apiUrl = `${process.env.NEXT_PUBLICK_RESTAPI_URL}/api/get-blogs/`;

const Home: NextPage<STATICPROPS> = ({ posts }) => {
  const config: SWRConfiguration = {
    fallbackData: posts,
  };
  const { data: blogs, mutate } = useSWR(apiUrl, fetcher, config);
  const filterdPosts = blogs.sort(
    (
      a: { created_at: string | number | bigint | any },
      b: { created_at: string | number | Date | any }
    ) => (new Date(b.created_at) as any) - (new Date(a.created_at) as any)
  );

  useEffect(() => {
    mutate();
  }, []);

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
                {filterdPosts[0].tags.map((tag: TAG) => (
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

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
};
