const apiConfig = {
  url: process.env.NEXT_PUBLIC_API_URL,
  domain: process.env.NEXT_PUBLIC_API_URL!.split("/api/v1")[0],
};

export default apiConfig;
