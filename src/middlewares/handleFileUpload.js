// fileHandler.js
const fs = require("fs");

// Function to handle file upload
const handleFileUpload = (file) => {
    return {
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
    };
};

module.exports = handleFileUpload;
