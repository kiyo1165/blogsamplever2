import { getAllIds, getPostDetail } from "../../lib/fetch";
import { GET_BLOGS } from "../../@types/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { TAG } from "../../@types/types";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/CodeBlock";
import remarkGfm from "remark-gfm";
import { ParsedUrlQuery } from "querystring";

const Blog: React.FC<GET_BLOGS | any> = ({
  title,
  content,
  tags,
  created_at,
  image,
}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="lg:max-w-4xl md:mx-auto px-4 my-4 ">
        <div>
          <div className="m-4 text-center">
            <Image
              src={image}
              alt="Picture of the author"
              width={450}
              height={400}
              className="mr-4 cursor-pointer"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="">
          <h2>{title}</h2>
          <p className="text-sm text-gray-400 text-right">{created_at}</p>
        </div>
        <div>
          <ul className="flex flex-row my-5">
            {tags &&
              tags.map((tag: TAG) => (
                <li
                  key={tag.id}
                  className="border rounded-md bg-black text-xs text-white py-1 px-2 last:mr-0 mr-1"
                >
                  {tag.name}
                </li>
              ))}
          </ul>
        </div>

        <article className="prose max-w-none">
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={content}
            components={{
              code: CodeBlock,
            }}
            remarkPlugins={[remarkGfm]}
          />
        </article>
      </div>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostDetail(params!.id as string);
  return {
    props: {
      ...post,
    },
    revalidate: 3,
  };
};
