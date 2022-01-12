import { Client } from "faunadb";
import cookie from "cookie";
export const FAUNA_SECRET_COOKIE = "faunaSecret";

export const serverClient = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET!,
});

export const faunaClient = (secret: string) =>
  new Client({
    secret,
  });

export const serializeCookie = (userSecret: string) => {
  const serialized = cookie.serialize(FAUNA_SECRET_COOKIE, userSecret, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600000,
    httpOnly: true,
    path: "/",
  });
  return serialized;
};

import Router from "next/router";

export const logout = async () => {
  await fetch("/api/logout");

  window.localStorage.setItem("logoutMovieList", `${Date.now()}`);

  Router.push("/");
};
