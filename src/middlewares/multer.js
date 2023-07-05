// multer.js
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
});

const upload = multer({ storage });

module.exports = upload;
