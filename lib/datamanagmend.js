// homepage - o nas

export const getData = async (apiName) => {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/${apiName}`,
    postData
  );
  const response = await res.json();
  return response;
};
