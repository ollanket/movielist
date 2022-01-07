import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <h1>Cookie-based authentication example</h1>

      <p>Steps to test the functionality:</p>

      <ol>
        <li>Click sign up and create an account, this will also log you in.</li>
        <li>
          Click home and click profile again, notice how your session is being
          used through a token stored in a cookie.
        </li>
        <li>
          Click logout and try to go to profile again. You&lsquo;ll get
          redirected to the `/login` route.
        </li>
      </ol>
    </>
  );
};

export default Home;
