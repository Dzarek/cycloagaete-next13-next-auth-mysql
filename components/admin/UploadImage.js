import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const UploadImage = ({ imagesCloudinary, setImagesCloudinary }) => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  const [uploadPreset] = useState(
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true, //add advanced options (public_id and tag)
    // sources: ["local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    folder: "galeria", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: { alt: "user_uploaded" }, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  return (
    <div className="cloudinaryUpload">
      <CloudinaryUploadWidget
        uwConfig={uwConfig}
        setPublicId={setPublicId}
        imagesCloudinary={imagesCloudinary}
        setImagesCloudinary={setImagesCloudinary}
      />
    </div>
  );
};

export default UploadImage;
