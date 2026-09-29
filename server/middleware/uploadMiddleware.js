import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const createStorage = (folder, extensionForFile = (file) => path.extname(file.originalname).toLowerCase()) => {
  const directory = path.resolve(process.cwd(), "uploads", folder);
  fs.mkdirSync(directory, { recursive: true });

  return multer.diskStorage({
    destination: directory,
    filename: (req, file, cb) => cb(null, `${randomUUID()}${extensionForFile(file)}`),
  });
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

const uploadFor = (folder, fileFilter, fileSize, extensionForFile) =>
  multer({
    storage: createStorage(folder, extensionForFile),
    fileFilter,
    limits: { fileSize },
  });

export const imageUpload = (folder) =>
  uploadFor(folder, imageFileFilter, 5 * 1024 * 1024, (file) => imageExtensions[file.mimetype]);
export const resumeUpload = uploadFor("resumes", pdfFileFilter, 10 * 1024 * 1024, () => ".pdf");

const projectUpload = uploadFor("projects", imageFileFilter, 5 * 1024 * 1024, (file) => imageExtensions[file.mimetype]);
export default projectUpload;