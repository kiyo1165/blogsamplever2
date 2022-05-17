import Head from "next/head";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useStateContext } from "../context/context";
import { useRouter } from "next/router";

export interface PROPS {
  title: string;
  children: ReactNode;
}

const cookie = new Cookies();
const Layout: React.FC<PROPS> = ({ children, title = "" }) => {
  const { isLogin, setIsLogin } = useStateContext();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  //ログイン判定
  useEffect(() => {
    if (cookie.get("access_token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logout = () => {
    cookie.remove("access_token");
    setIsLogin(false);
    router.push("/register");
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between m-2 max-w-[1025px]">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <Link href="/">
                <a>
                  <Image
                    src="/Quest Love - MarkMaker Logo.svg"
                    width={135}
                    height={135}
                    alt="Quest Love"
                    quality={100}
                  />
                </a>
              </Link>

              <button
                className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (openMenu ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                    href="#pablo"
                  >
                    <span className="ml-2">Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                    href="#pablo"
                  >
                    <span className="ml-2">Contact</span>
                  </a>
                </li>
                {isLogin ? (
                  <li className="nav-item">
                    <button
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                      onClick={logout}
                    >
                      {" "}
                      Logout
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container max-w-[1025px] grid grid-cols-5">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};
export default Layout;
