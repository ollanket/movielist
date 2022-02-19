import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
  const syncLogout = (event: StorageEvent) => {
    if (event.key === "logoutMovieList") {
      Router.push("/");
    }
  };
  useEffect(() => {
    // Show Progressbar on navigation
    const startLoading = () =>
      NProgress.configure({ showSpinner: false }).start();
    const stopLoading = () => NProgress.done();
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);
    window.addEventListener("storage", syncLogout);
    return () => {
      // Cleanup
      window.removeEventListener("storage", syncLogout);
      window.localStorage.removeItem("logoutMovieList");
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
