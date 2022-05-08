/* eslint-disable react/jsx-key */
/* eslint-disable react/no-children-prop */
import Head from "next/head";
import { TAG, BLOG_POST, LOGIN_USER } from "../@types/types";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import CodeBlock from "../components/CodeBlock";
import axios from "axios";
import Cookies from "universal-cookie";

import Tag from "../components/Tag";

const cookie = new Cookies();
const CreateBlog: React.FC = () => {
  const router = useRouter();
  const initState: BLOG_POST = {
    title: "",
    content: "",
    user: 0,
    tags: [],
    is_active: false,
    image: null,
  };
  const initLoginUser: LOGIN_USER = {
    id: 0,
    email: "",
    name: "",
  };
  const [inputState, setInputState] = useState<BLOG_POST>(initState);
  const [option, setOption] = useState("下書き");
  const [inputTag, setInputTag] = useState("");
  const [tagList, setTagList] = useState<TAG[]>();
  const [img, setImg] = useState<any>();

  const [createObjectURL, setCreateObjectURL] = useState("");
  const [loginUser, setLoginUser] = useState<LOGIN_USER>(initLoginUser);
  const [error, setError] = useState("");

  //投稿or下書き保存toggle
  const getSelectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOption(value);
    if (value === "下書き") {
      setInputState({ ...inputState, is_active: false });
    } else {
      setInputState({ ...inputState, is_active: true });
    }
  };

  const handleInputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputTag(value);
    AsyncGetTags();
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name: string = e.target.name;
    setInputState({
      ...inputState,
      [name]: e.target.value,
    });
  };

  const AsyncGetTags = async () => {
    try {
      setTagList([]);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/?name=${inputTag}`
      );
      if (res.status === 200) {
        setTagList(res.data);
      } else {
        throw console.log("not AsyncGetTagsエラー");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getLoginUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/self_user/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.status === 200) {
        setLoginUser(res.data);
        setInputState({ ...inputState, user: loginUser.id });
      }
    } catch (e: any) {
      setError(e);
      router.push("/register");
    }
  };
  useEffect(() => {
    getLoginUser();
  }, [inputState.title]);

  const AsyncBlogPost = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/create-blog/`,
        inputState,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.data) {
        const formData = new FormData();
        formData.append("image", img);
        const image_res = await axios.patch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/create-blog/${res.data.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${cookie.get("access_token")}`,
            },
          }
        );
        console.log(image_res);
      }
    } catch {
      (e: any) => {
        if (e.response && e.response.status === 400) {
          return console.log(e.response);
        } else if (e.response.status === 401) {
          setError("トークンが切れました。再度ログインしてください。");
          router.push("/");
        }
      };
    }
  };

  const uploadToClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      //   setInputState({ ...inputState, image:  });
      //   setCreateObjectURL(URL.createObjectURL(e.target.files[0]));
    }
    console.log(img);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const array: any = [];
    inputState.tags.map((tag: any) => {
      array.push(tag.id);
    });
    setInputState((inputState.tags = array));
    await AsyncBlogPost();
    setInputState(initState);
    setTagList([]);
  };

  return (
    <>
      <Head>
        <title>Createblog</title>
      </Head>
      <h2 className="my-3">null</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border rounded-sm w-full p-1 outline-none focus:border-gray-400 mb-0.5 mx-0.5"
            name="title"
            onChange={handleInputChange}
            value={inputState.title}
            placeholder="タイトル"
          />
          <input
            type="search"
            className="border rounded-sm w-full p-1 outline-none focus:border-blue-200 mx-0.5"
            name="tag"
            value={inputTag}
            onChange={handleInputTag}
            placeholder="タグ検索"
          />
          <ul className="text-gray-700">
            {tagList &&
              tagList.map((tag: any, index) => (
                <>
                  <li
                    key={index}
                    className="absolute visible p-2 bg-white text-gray-700  cursor-pointer hover:border-red-500 "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setInputState({
                          ...inputState,
                          tags: [tag, ...inputState.tags],
                        });
                        setInputTag("");
                        setTagList([]);
                      }}
                    >
                      {tag.name}
                    </button>
                  </li>
                </>
              ))}
          </ul>
          <div className="border-b">
            {inputState.tags &&
              inputState.tags.map((tag: any, index) => (
                <Tag
                  tag={tag}
                  index={index}
                  setInputState={setInputState}
                  inputState={inputState}
                />
              ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <textarea
                className={`border-r w-full h-[550px] resize-none p-1 outline-none focus:border-gray-400 `}
                name="content"
                onChange={handleInputChange}
              />
            </div>
            <div className="border-none w-full p-1 outline-none focus:border-gray-400">
              <article className="prose lg:prose-xl">
                <ReactMarkdown
                  children={inputState.content}
                  components={{
                    code: CodeBlock,
                  }}
                  remarkPlugins={[remarkGfm]}
                />
              </article>
            </div>
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={uploadToClient}
              multiple
            />
          </div>

          <div className="absolute bottom-0 border w-full h-16 bg-gray-700 flex items-center justify-end">
            <div className="py-2 mx-6">
              <select
                onChange={getSelectedValue}
                className="outline-none w-5 h-8 pr-6 bg-teal-500"
              >
                <option value="下書き">下書き保存</option>
                <option value="投稿">投稿</option>
              </select>
              {option === "下書き" ? (
                <button
                  type="submit"
                  className=" bg-teal-500 text-white py-1 px-2 w-56"
                >
                  下書き保存
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-teal-500 text-white py-1 px-2  w-56"
                >
                  投稿
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
