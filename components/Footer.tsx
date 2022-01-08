import React from "react";
import { IconType } from "react-icons/lib";
import { MdFavorite, MdCoffee } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between flex-wrap bg-teal-100 p-3 rounded-t-md border border-teal-300">
      <div className="flex items-center justify-between flex-wrap bg-teal-100 w-full">
        <div className="flex items-center flex-shrink-0 text-teal-700 mr-6 text-sm">
          <span>Made with&nbsp;</span>
          <MdFavorite />
          <span>&nbsp;&&nbsp;</span>
          <MdCoffee />
          <span className=" hidden sm:block">&nbsp;using&nbsp;</span>
          <Alink url="https://nextjs.org/" text="Next.js" />
          <span className=" hidden sm:block">,&nbsp;</span>
          <Alink url="https://tailwindcss.com/" text="tailwindcss" />
          <span className=" hidden sm:block">,&nbsp;</span>
          <Alink url="https://fauna.com/" text="Fauna" />
          <span className=" hidden sm:block">&nbsp;&&nbsp;</span>
          <Alink url="https://www.omdbapi.com/" text="OMDB API" />
          <span>.</span>
        </div>
        <div className="flex items-center text-teal-700 place-self-end">
          <FaGithub className="text-black" />
          <span>&nbsp;</span>
          <a
            className=" font-semibold underline"
            href="https://github.com/ollanket/movielist-fauna-next.js-ts"
          >
            source
          </a>
        </div>
      </div>
    </footer>
  );
};

const Alink = ({ url, text }: { url: string; text: string }) => {
  return (
    <>
      <a className="font-semibold underline hidden sm:inline-block" href={url}>
        {text}
      </a>
    </>
  );
};

export default Footer;
