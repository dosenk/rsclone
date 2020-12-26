const basicFetcher = async (url) => {
  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) return response.json();

  throw new Error(response.status);
};
