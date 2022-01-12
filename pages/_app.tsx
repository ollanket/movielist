import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Router from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const syncLogout = (event: StorageEvent) => {
    if (event.key === "logoutMovieList") {
      Router.push("/");
    }
  };
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
      window.localStorage.removeItem("logoutMovieList");
    };
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
