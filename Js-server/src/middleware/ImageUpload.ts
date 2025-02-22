import multer from "multer";
import { fileTypeFromBlob } from "file-type";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../upload");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}-${Date.now()}`);
  },
});

export  const upload = multer({
  storage,
  limits: {
    fileSize: 2097152, 
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Please upload an image"));
    }

    cb(null, true);
  },
});
