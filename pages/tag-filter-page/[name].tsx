import { getAllTagIds, getTagFillterdPosts } from "../../lib/fetch";
import { GetStaticPaths, GetStaticProps } from "next";
import { GET_BLOGS } from "../../@types/types";
import Post from "../../components/Post";
import Head from "next/head";
import RightSideBar from "../../components/RightSideBar";

const TagsFilter: React.FC<GET_BLOGS[] | any> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>タグ検索</title>
      </Head>
      <div className="container max-w-[1025px] grid grid-cols-5">
        <section className="text-gray-800 body-font overflow-hidden col-span-4">
          {posts &&
            posts.map((post: any) => <Post key={post.id} post={post} />)}
        </section>
        <RightSideBar />
      </div>
    </>
  );
};

export default TagsFilter;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagIds();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getTagFillterdPosts(params!.name as string);
  return {
    props: {
      posts,
    },
    revalidate: 3,
  };
};
