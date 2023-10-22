// export async function search(options = {}) {
//   const params = {
//     ...options,
//   };

//   if (options.nextCursor) {
//     params.next_cursor = options.nextCursor;
//     delete params.nextCursor;
//   }

//   const paramString = Object.keys(params)
//     .map((key) => `${key}=${encodeURIComponent(params[key])}`)
//     .join("&");
//   console.log(paramString);

//   const results = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           process.env.CLOUDINARY_API_KEY +
//             ":" +
//             process.env.CLOUDINARY_API_SECRET
//         ).toString("base64")}`,
//       },
//     }
//   ).then((r) => r.json());

//   return results;
// }

export const getGalleryImages = async () => {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?expression=folder"bikes"`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  const { resources } = results;
  const data_galeria = resources.map((resource) => {
    return {
      id: resource.public_id,
      image: resource.secure_url,
    };
  });

  return data_galeria;
};
