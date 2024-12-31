import axios from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useFetchData = (endpoint, queryKey, page) => {
  return useQuery({
    queryKey: [queryKey, page],
    queryFn: async () => {
      const { data } = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`,
        },
      });
      return data;
    },
    placeholderData: keepPreviousData,
    retry: 2,
  });
};
