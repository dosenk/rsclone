const basicFetcher = async (url: URL | string): Promise<JSON> => {
  const response: Response = await fetch(url.toString());

  if (response.status >= 200 && response.status < 300) return response.json();

  throw new Error(response.status.toString());
};
