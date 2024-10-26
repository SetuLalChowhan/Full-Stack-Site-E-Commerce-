const multer = require("multer");
const path = require("path");

// Configure storage with absolute path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Use `path.join` for cross-platform support
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Keep file name unique
  },
});

// Validate file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isExtnameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeTypeValid = allowedTypes.test(file.mimetype);

  if (isExtnameValid && isMimeTypeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

module.exports = upload;
