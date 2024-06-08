import cloudinary from "cloudinary";
import { CLOUDINARY_API_KEY_PUBLIC, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../../constants.js";

cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY_PUBLIC,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
});

export const MediaDeleter = async (prId) => {
    cloudinary.v2.api
  .delete_resources([prId], 
    { type: 'upload', resource_type: 'image' })
  .then(()=> {
    return {
        message: "Media deleted"
    }
  });
};