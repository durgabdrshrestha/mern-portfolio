import fs from "fs";
import path from "path";

/**
 * Delete an uploaded file from the server.
 *
 * Example:
 * /uploads/projects/example.jpg
 */
export const deleteUploadedFile = (fileUrl) => {
  try {
    // No file URL provided
    if (!fileUrl) {
      return;
    }

    // Convert URL path to local filesystem path
    const filePath = path.join(
      process.cwd(),
      fileUrl.replace(/^\/+/, "")
    );

    // Check whether file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log("Deleted file:", filePath);
    }
  } catch (error) {
    console.error(
      "Error deleting uploaded file:",
      error
    );
  }
};