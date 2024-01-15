"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.uploaded = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.uploaded = upload.single("myFile");
const uploadFile = (req, res) => {
    const file = req.file;
    if (!file)
        return res.status(400).send("Please upload a file");
    const fileLocation = `https://api.istvc.edu.ec/uploads/${Date.now()}-${file.originalname}`;
    res.send({ location: fileLocation });
};
exports.uploadFile = uploadFile;
