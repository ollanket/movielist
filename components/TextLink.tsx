import Link from "next/link";
import React from "react";

const TextLink = ({
  href,
  heading,
  paragraph,
}: {
  href: string;
  heading: string;
  paragraph: string;
}) => {
  return (
    <Link href={href}>
      <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-teal-700 duration-200 hover:border-transparent hover:text-white">
        <h3 className="text-2xl font-bold">{heading}</h3>
        <p className="mt-4 text-xl">{paragraph}</p>
      </a>
    </Link>
  );
};

export default TextLink;
