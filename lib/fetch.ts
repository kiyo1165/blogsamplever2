import { GET_BLOGS, TAG } from "../@types/types";
import axios from "axios";

export const getAllPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/`
  );
  const posts = await res.json();

  return posts;
};

//id取得
export const getAllIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/`
  );
  const posts: GET_BLOGS[] = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

export const getPostDetail = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/${id}/`
  );
  const posts = await res.json();
  return posts;
};

//tagid取得
export const getAllTagIds = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/`
    );
    const tags = res.data;
    return tags.map((tag: TAG) => {
      return {
        params: {
          name: String(tag.name),
        },
      };
    });
  } catch (error) {
    console.log(error);
  }
};

//タグ毎の記事
export const getTagFillterdPosts = async (name: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/get-blogs/?tags=${name}`
    );
    const posts = res.data;
    // console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};
