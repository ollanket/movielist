import React from "react";
import { IconType } from "react-icons/lib";
import { MdFavorite, MdCoffee } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between flex-wrap bg-teal-100 p-3 rounded-t-md fixed bottom-0 w-screen border border-teal-300">
      <div className="flex items-center justify-between flex-wrap bg-teal-100">
        <div className="flex items-center flex-shrink-0 text-teal-700 mr-6 text-sm">
          <span>Made with&nbsp;</span>
          <MdFavorite />
          <span>&nbsp;&&nbsp;</span>
          <MdCoffee />
          <span>&nbsp;using&nbsp;</span>
          <Alink url="https://nextjs.org/" text="Next.js" />
          <span>,&nbsp;</span>
          <Alink url="https://tailwindcss.com/" text="tailwindcss" />
          <span>,&nbsp;</span>
          <Alink url="https://fauna.com/" text="Fauna" />
          <span>&nbsp;&&nbsp;</span>
          <Alink url="https://www.omdbapi.com/" text="OMDB API" />
        </div>
        <div className="fixed right-4 flex items-center text-teal-700">
          <FaGithub className="text-black" />
          <span>&nbsp;</span>
          <Alink url="" text="source" />
        </div>
      </div>
    </footer>
  );
};

const Alink = ({ url, text }: { url: string; text: string }) => {
  return (
    <>
      <a className="font-semibold underline" href={url}>
        {text}
      </a>
    </>
  );
};

export default Footer;
