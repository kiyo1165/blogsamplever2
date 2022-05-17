import Head from "next/head";
import { GET_BLOGS } from "../@types/types";
import Link from "next/link";
import Image from "next/image";
const Post: React.FC<GET_BLOGS | any> = ({ post }) => {
  return (
    <>
      <div className="px-4 py-2 flex flex-wrap md:flex-nowrap">
        <Image
          src={post.image}
          alt="Picture of the author"
          width={120}
          height={100}
          className="w-120 mr-10"
        />

        <div className="w-200 max-w-lg ml-4">
          <Link href="/posts/[id]" as={`/posts/${post.id}`} passHref>
            <h4 className="mb-2 hover:underline cursor-pointer">
              <a>{post.title}</a>
            </h4>
          </Link>
          <p className="m-2 text-gray-500 text-xs text-right">
            {post.created_at}
          </p>
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
      </div>
    </>
  );
};

export default Post;
