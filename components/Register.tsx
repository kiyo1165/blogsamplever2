import Head from "next/head";
import React, { useState, useEffect } from "react";
import { CRED, TAG, TAG_POST, BLOG_POST } from "../@types/types";
import axios from "axios";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";

const cookie = new Cookie();

const Register: React.FC = () => {
  const router = useRouter();
  const initCredState: CRED = {
    email: "",
    password: "",
  };
  const [toggle, setToggle] = useState(true);
  const [inputState, setInputState] = useState(initCredState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleChangeMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const handleInputState = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    const value = e.target.value;
    setInputState({ ...inputState, [name]: value });
  };
  //disabled handler
  useEffect(() => {
    if (inputState.email && inputState.password) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [inputState.email, inputState.password, setInputState]);

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}auth/jwt/create/`,
        inputState,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const options = { path: "/" };
        cookie.set("access_token", res.data.access, options);
        router.push("/create-blog");
      }
    } catch {
      setError("Login Error");
    }
  };

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toggle) {
      login();
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`,
          inputState,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) login();
      } catch {
        setError("Registration Error");
      }
    }
  };

  return (
    <div className="container mx-auto w-96">
      <Head>
        <title>Register</title>
      </Head>

      <p>{error}</p>

      <form
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={authUser}
      >
        <h1 className="text-center m-4">
          {" "}
          {toggle ? <p>Login</p> : <p>SignUp</p>}
        </h1>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="email"
            value={inputState.email}
            onChange={handleInputState}
          />
        </div>
        <div className="mb-6">
          <label className="block  text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={inputState.password}
            onChange={handleInputState}
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4  focus:outline-none focus:shadow-outline"
            disabled={isLoading}
            type="submit"
          >
            {toggle ? <p>Login</p> : <p>SignUp</p>}
          </button>

          <button
            className="inline-block  text-sm text-blue-500 hover:text-blue-800"
            onClick={handleChangeMode}
          >
            {toggle ? <p>SignUp</p> : <p>Login</p>}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default Register;
