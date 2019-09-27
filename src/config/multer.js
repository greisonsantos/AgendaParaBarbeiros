const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, result) => {
        if (error) return cb(error);
        cb(null, result.toString("hex") + path.extname(file.originalname));
      });
    }
  })
};
