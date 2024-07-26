"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.downloadFile = exports.uploadFile = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.uploadMiddleware = upload.single('file');
// Função para fazer upload de um arquivo
const uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        (0, logger_1.default)('error', 'Nenhum arquivo enviado'); // Adicionando log de erro
        return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo' });
    }
    (0, logger_1.default)('info', `Arquivo carregado: ${file.filename}`); // Adicionando log de sucesso
    res.send({ message: 'Arquivo carregado com sucesso', file });
};
exports.uploadFile = uploadFile;
// Função para fazer download de um arquivo
const downloadFile = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path_1.default.join(__dirname, '../../uploads', fileName);
    if (!fs_1.default.existsSync(filePath)) {
        (0, logger_1.default)('error', `Arquivo não encontrado: ${fileName}`); // Adicionando log de erro
        return res.status(404).send({ message: 'Arquivo não encontrado' });
    }
    (0, logger_1.default)('info', `Arquivo baixado: ${fileName}`); // Adicionando log de sucesso
    res.download(filePath);
};
exports.downloadFile = downloadFile;
// Função para deletar um arquivo
const deleteFile = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path_1.default.join(__dirname, '../../uploads', fileName);
    if (!fs_1.default.existsSync(filePath)) {
        (0, logger_1.default)('error', `Arquivo não encontrado para deletar: ${fileName}`); // Adicionando log de erro
        return res.status(404).send({ message: 'Arquivo não encontrado' });
    }
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            (0, logger_1.default)('error', `Erro ao deletar arquivo: ${err.message}`); // Adicionando log de erro
            return res.status(500).send({ message: 'Erro ao deletar arquivo' });
        }
        (0, logger_1.default)('info', `Arquivo deletado: ${fileName}`); // Adicionando log de sucesso
        res.send({ message: 'Arquivo deletado com sucesso' });
    });
};
exports.deleteFile = deleteFile;
