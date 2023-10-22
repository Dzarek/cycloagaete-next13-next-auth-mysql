import Cloudinary from "cloudinary";

const cloudinary = new Cloudinary({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEYE,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRETE,
});

export async function deleteImage(publicId) {
  try {
    await cloudinary.destroy(publicId);
  } catch (error) {
    console.error(error);
  }
}
