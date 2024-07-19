"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
const uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo' });
    }
    res.send({ message: 'Arquivo carregado com sucesso', file });
};
exports.uploadFile = uploadFile;
exports.uploadMiddleware = upload.single('file');
