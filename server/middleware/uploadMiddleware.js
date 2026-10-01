import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { getCloudinary } from "../utils/cloudinaryClient.js";

const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const createStorage = (
  folder,
  extensionForFile = (file) => path.extname(file.originalname).toLowerCase(),
  resourceType = "image"
) => {
  let diskStorage;
  const getDiskStorage = () => {
    if (!diskStorage) {
      const directory = path.resolve(process.cwd(), "uploads", folder);
      fs.mkdirSync(directory, { recursive: true });
      diskStorage = multer.diskStorage({
        destination: directory,
        filename: (req, file, cb) => cb(null, `${randomUUID()}${extensionForFile(file)}`),
      });
    }
    return diskStorage;
  };

  return {
    _handleFile(req, file, callback) {
      if (process.env.UPLOAD_PROVIDER !== "cloudinary") {
        getDiskStorage()._handleFile(req, file, callback);
        return;
      }

      let cloudinary;
      try {
        cloudinary = getCloudinary();
      } catch (error) {
        callback(error);
        return;
      }

      const extension = extensionForFile(file);
      const publicId = `${randomUUID()}${resourceType === "raw" ? extension : ""}`;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: resourceType,
          ...(resourceType === "image" && { quality: "auto", fetch_format: "auto" }),
        },
        (error, result) => {
          if (error) {
            callback(error);
            return;
          }

          callback(null, {
            filename: result.public_id,
            path: result.secure_url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            size: result.bytes,
          });
        }
      );

      file.stream.pipe(uploadStream);
    },

    _removeFile(req, file, callback) {
      if (file.public_id && file.resource_type) {
        cloudinary.uploader
          .destroy(file.public_id, { resource_type: file.resource_type })
          .then(() => callback(null))
          .catch(callback);
        return;
      }

      getDiskStorage()._removeFile(req, file, callback);
    },
  };
};

const imageFileFilter = (req, file, cb) => {
  if (imageExtensions[file.mimetype]) {
    cb(null, true);
    return;
  }
  cb(new Error("Only JPG, PNG, WEBP and GIF images are allowed."));
};

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" && path.extname(file.originalname).toLowerCase() === ".pdf") {
    cb(null, true);
    return;
  }
  cb(new Error("Only PDF documents are allowed."));
};

const uploadFor = (folder, fileFilter, fileSize, extensionForFile, resourceType = "image") =>
  multer({
    storage: createStorage(folder, extensionForFile, resourceType),
    fileFilter,
    limits: { fileSize },
  });

export const imageUpload = (folder) =>
  uploadFor(folder, imageFileFilter, 5 * 1024 * 1024, (file) => imageExtensions[file.mimetype]);
export const resumeUpload = uploadFor("resumes", pdfFileFilter, 10 * 1024 * 1024, () => ".pdf", "raw");

export const uploadedFileUrl = (file, folder) =>
  file?.secure_url || (file ? `/uploads/${folder}/${file.filename}` : "");

const projectUpload = uploadFor("projects", imageFileFilter, 5 * 1024 * 1024, (file) => imageExtensions[file.mimetype]);
export default projectUpload;