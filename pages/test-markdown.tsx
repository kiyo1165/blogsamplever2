import React, { useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MdEditor, { Plugins } from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css"; // highlight.jsの好みのスタイルをここで指定
import Head from "next/head";
import Cookies from "universal-cookie";
import { TAG, BLOG_POST, LOGIN_USER } from "../@types/types";

MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1, // EditorでのTab入力有効
});

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // Prismも使おうと思えばここでいけるかな？
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return "";
  },
});

const cookie = new Cookies();

const App: React.FC = () => {
  const initState: BLOG_POST = {
    title: "",
    content: "",
    user: 1,
    tags: [],
    is_active: false,
    image: null,
  };
  const [text, setText] = useState("");
  const handleEditorChange = ({ text, html }) => {
    setText(text);
    console.log(html);
  };
  const handleImageUpload = async (file: any) => {
    // テスト用にphpでuploadするコードを書いています(package.jsonに"proxy": "http://127.0.0.1"を追加してXAMPPのディレクトリを見るようにしています)
    try {
      const data = new FormData();
      data.append("image", file);
      const user = { user: 1, image: null };
      const json_text = JSON.stringify(user);
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/create-blog/`,
        json_text,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (result.status === 201) {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/create-blog/${result.data.id}/`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `JWT ${cookie.get("access_token")}`,
            },
          }
        );
        console.log("image" + res);
      }
    } catch (error) {
      // error dialogとかlogとか(未実装)
      console.log(error);
    }
    /*return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = data => {
        resolve(data.target.result)
      };
      reader.readAsDataURL(file)
    });*/
  };
  const renderHTML = (text: any) => {
    return mdParser.render(text);
  };
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <MdEditor
        style={{ height: "600px" }}
        renderHTML={renderHTML}
        onChange={handleEditorChange}
        onImageUpload={handleImageUpload}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true,
          },
          table: {
            maxRow: 5,
            maxCol: 6,
          },
          syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
          imageAccept: ".jpg,.png",
        }}
      />
    </>
  );
};

export default App;
