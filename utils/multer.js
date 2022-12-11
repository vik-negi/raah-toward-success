import multer from "multer";
const storage = multer.diskStorage({});
const multerUploads = multer({ storage: storage });
export { multerUploads };
