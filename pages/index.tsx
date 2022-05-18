import type { NextPage } from "next";
import Head from "next/head";
import { useStateContext } from "../context/context";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/fetch";
import { GET_BLOGS } from "../@types/types";
import Post from "../components/Post";
import useSWR from "swr";
import { useEffect } from "react";
import type { SWRConfiguration } from "swr";
import RightSideBar from "../components/RightSideBar";
interface STATICPROPS {
  posts: GET_BLOGS[];
}

const Home: NextPage<STATICPROPS> = ({ posts }) => {
  const { tagData, setTagData } = useStateContext();
  const config: SWRConfiguration = {
    fallbackData: posts,
  };
  // const fetcher = async (url: any) => await fetch(url).then((res) => res.json);
  // const apiUrl = "http://127.0.0.1:8000/api/get-blogs/";
  // const { data: posts, mutate } = useSWR(apiUrl, fetcher, config);

  // console.log(posts);

  const getTagList = () => {
    const tagCount: any = {};
    let taglist = [];
    for (let i = 0; i < posts.length; i++) {
      taglist.push(...posts[i].tags);
    }

    for (let j = 0; j < taglist.length; j++) {
      let key = taglist[j].name;
      tagCount[key] = (tagCount[key] || 0) + 1;
    }
    setTagData(tagCount);
    return tagData;
  };
  useEffect(() => {
    getTagList();
  }, []);

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <div className="container max-w-[1025px] grid grid-cols-5">
        <section className="text-gray-800 body-font overflow-hidden col-span-4">
          {posts &&
            posts.map((post: GET_BLOGS) => <Post key={post.id} post={post} />)}
        </section>

        <RightSideBar tagCount={tagData} />
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
