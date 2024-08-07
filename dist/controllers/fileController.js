"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.downloadFile = exports.uploadFile = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../middlewares/logger")); // Adicionando middleware de logger
const storage = new storage_1.Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || 'your-bucket-name');
// Tipos de arquivos permitidos para upload
const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
// Configuração do Multer para armazenamento local temporário
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Tipo de arquivo não permitido'));
        }
    }
});
exports.uploadMiddleware = upload.single('file');
// Função para fazer upload de um arquivo
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        (0, logger_1.default)('error', 'Nenhum arquivo enviado'); // Adicionando log de erro
        return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo' });
    }
    const blob = bucket.file(`${Date.now()}-${file.originalname}`);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', err => {
        (0, logger_1.default)('error', `Erro ao fazer upload do arquivo: ${err.message}`); // Adicionando log de erro
        return res.status(500).send({ message: 'Erro ao fazer upload do arquivo' });
    });
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        (0, logger_1.default)('info', `Arquivo carregado: ${blob.name}`); // Adicionando log de sucesso
        res.status(200).send({ message: 'Arquivo carregado com sucesso', file: publicUrl });
    });
    blobStream.end(file.buffer);
});
exports.uploadFile = uploadFile;
// Função para fazer download de um arquivo
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    const file = bucket.file(fileName);
    try {
        yield file.download({ destination: path_1.default.join('/tmp', fileName) });
        (0, logger_1.default)('info', `Arquivo baixado: ${fileName}`); // Adicionando log de sucesso
        res.download(path_1.default.join('/tmp', fileName));
    }
    catch (error) {
        (0, logger_1.default)('error', `Arquivo não encontrado: ${fileName}`); // Adicionando log de erro
        res.status(404).send({ message: 'Arquivo não encontrado' });
    }
});
exports.downloadFile = downloadFile;
// Função para deletar um arquivo
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    const file = bucket.file(fileName);
    try {
        yield file.delete();
        (0, logger_1.default)('info', `Arquivo deletado: ${fileName}`); // Adicionando log de sucesso
        res.status(200).send({ message: 'Arquivo deletado com sucesso' });
    }
    catch (error) {
        (0, logger_1.default)('error', `Erro ao deletar arquivo: ${error.message}`); // Adicionando log de erro
        res.status(500).send({ message: 'Erro ao deletar arquivo' });
    }
});
exports.deleteFile = deleteFile;
