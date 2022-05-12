import Head from "next/head";
import { GET_BLOGS } from "../@types/types";
import Link from "next/link";
import Image from "next/image";
const Post: React.FC<GET_BLOGS | any> = ({ post }) => {
  return (
    <>
      <Head>
        <title>post</title>
      </Head>
      <div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-28 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="m-4 text-gray-500 text-xs">{post.created_at}</span>
          </div>
          <div className="md:flex-grow max-w-md mr-4">
            <Link href="/posts/[id]" as={`/posts/${post.id}`} passHref>
              <h4 className="mb-2 hover:underline cursor-pointer">
                <a>{post.title}</a>
              </h4>
            </Link>
            <ul className="flex flex-row my-2">
              {post.tags.map((tag: any) => (
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
          </div>
          <div className="md:flex-grow">
            <Image
              src={post.image}
              alt="Picture of the author"
              width={120}
              height={100}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
