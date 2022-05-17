import type { NextPage } from "next";
import Head from "next/head";

import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/fetch";
import { GET_BLOGS, TAG } from "../@types/types";
import Post from "../components/Post";
import useSWR from "swr";
import { ReactChild, ReactFragment, ReactPortal, useEffect } from "react";
import type { SWRConfiguration } from "swr";
import axios from "axios";
import RightSideBar from "../components/RightSideBar";
interface STATICPROPS {
  posts: GET_BLOGS[];
}

const Home: NextPage<STATICPROPS> = ({ posts }) => {
  const config: SWRConfiguration = {
    fallbackData: posts,
  };
  // const fetcher = async (url: any) => await fetch(url).then((res) => res.json);
  // const apiUrl = "http://127.0.0.1:8000/api/get-blogs/";
  // const { data: posts, mutate } = useSWR(apiUrl, fetcher, config);

  // console.log(posts);

  const tagCount: any = {};
  let taglist = [];
  for (let i = 0; i < posts.length; i++) {
    taglist.push(...posts[i].tags);
  }

  for (let j = 0; j < taglist.length; j++) {
    let key = taglist[j].name;
    tagCount[key] = (tagCount[key] || 0) + 1;
  }
  // console.log(tagCount);

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      {/* <div className="container lg:max-w-4xl md:mx-auto px-4 my-4 ">
        <h3 className="border-b">New</h3>
        <div className="lg:max-h-70">
          <div className="lg:flex">
            <div className="m-4 text-center">
              <Link href="/posts/[id]" as={`/posts/${posts[0].id}`}>
                <a>
                  <Image
                    src={posts[0].image}
                    alt="Picture of the author"
                    width={300}
                    height={300}
                    className="mr-4 cursor-pointer"
                  />
                </a>
              </Link>
            </div>
            <div className="m-3 lg:max-w-md">
              <Link href="/posts/[id]" as={`/posts/${posts[0].id}`}>
                <a>
                  <h2 className="my-3 cursor-pointer hover:underline">
                    {posts[0].title}
                  </h2>
                </a>
              </Link>

              <ul className="flex flex-row my-5">
                {posts[0].tags.map((tag: TAG) => (
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
                {posts[0].created_at}
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <section className="text-gray-800 body-font overflow-hidden col-span-4">
        {posts &&
          posts.map((post: GET_BLOGS) => <Post key={post.id} post={post} />)}
      </section>
      <section>
        <h4>記事</h4>
        <ul>
          <RightSideBar tagCount={tagCount} />
        </ul>
      </section>
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
