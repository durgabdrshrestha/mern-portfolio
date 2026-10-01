import fs from "fs";
import path from "path";
import { getCloudinary } from "./cloudinaryClient.js";

/**
 * Delete an uploaded file from the server.
 *
 * Example:
 * /uploads/projects/example.jpg
 */
export const deleteUploadedFile = async (fileUrl) => {
  try {
    if (!fileUrl) {
      return;
    }

    if (fileUrl.startsWith("https://res.cloudinary.com/")) {
      const parsedUrl = new URL(fileUrl);
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean).map(decodeURIComponent);
      const resourceType = pathParts.find((part) => ["image", "video", "raw"].includes(part));
      const uploadIndex = pathParts.indexOf("upload");
      const versionIndex = pathParts.findIndex((part, index) => index > uploadIndex && /^v\d+$/.test(part));

      if (!resourceType || uploadIndex < 0 || versionIndex < 0) {
        console.error("Unable to determine Cloudinary asset ID from URL.");
        return;
      }

      const publicId = pathParts.slice(versionIndex + 1).join("/");
      const idWithoutExtension = resourceType === "raw"
        ? publicId
        : publicId.slice(0, -path.posix.extname(publicId).length);

      await getCloudinary().uploader.destroy(idWithoutExtension, { resource_type: resourceType });
      return;
    }

    if (/^https?:\/\//i.test(fileUrl) || !fileUrl.startsWith("/uploads/")) {
      return;
    }

    const root = path.resolve(process.cwd());
    const filePath = path.resolve(root, fileUrl.replace(/^\/+/, ""));
    if (!filePath.startsWith(`${root}${path.sep}`)) {
      return;
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(
      "Error deleting uploaded file:",
      error
    );
  }
};