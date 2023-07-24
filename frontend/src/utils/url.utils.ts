import { objectKeys } from "./object.utils";

type UrlStringifyParams = {
  pathname: string;
  search?: { [key: string]: string | number };
  hash?: string;
};

const urlStringify = (params: UrlStringifyParams) => {
  const { pathname, search, hash } = params;
  const queryString = search
    ? objectKeys(search)
        .map((key) => `${key}=${search[key]}`)
        .join("&")
    : "";

  return `${pathname}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
};

const urlParse = (url: string) => {
  const [pathname, searchAndHash] = url.split("?");
  const [search, hash] = searchAndHash.split("#");
  const searchParams = search.split("&").reduce(
    (acc, cur) => {
      const [key, value] = cur.split("=");
      return { ...acc, [key]: value };
    },
    {} as { [key: string]: string },
  );

  return {
    pathname,
    search: searchParams,
    hash,
  };
};

export { urlStringify, urlParse };
