import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StateProvider } from "../context/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Layout title={pageProps}>
        <Component {...pageProps} />;
      </Layout>
    </StateProvider>
  );
}

export default MyApp;
