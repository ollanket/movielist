import useSWR, { Fetcher } from "swr";
import { userAuthData } from "../../types/types";

const userFetcher: Fetcher<userAuthData, string> = async (url) => {
  const res = await fetch(url);
  if (res.status >= 300) {
    throw new Error("API error");
  }
  return res.json();
};
/**
 * Custom hook that gets loginstate and username.
 * Uses swr.
 * @returns object containing data, loading state and error state
 */
export function useUser() {
  const { data, error } = useSWR("/api/getUser", userFetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}
