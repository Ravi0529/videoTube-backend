import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         const response = await cloudinary.uploader.upload(
//             localFilePath, {
//             resource_type: "auto"
//         }
//         )
//         console.log("File uploaded on cloudinary. File src: " + response.url)

//         // once a file is uploaded, we vwould like to delete it from our server
//         fs.unlinkSync(localFilePath)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         return null
//     }
// }

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(
            localFilePath, { resource_type: "auto" }
        );
        console.log("File uploaded to Cloudinary. File src:", response.url);

        // Delete the file from the server once uploaded
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);  // Log the error details
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);  // Ensure file is deleted even on failure
        }
        throw new Error("Cloudinary upload failed");  // Pass the error back to the controller
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const reault = await cloudinary.uploader.destroy(publicId)
        console.log("Deleting from cloudinary. PublicId", publicId)
    } catch (error) {
        console.log("Error deleting the cloudinary", error)
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }