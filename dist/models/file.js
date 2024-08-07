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
exports.deleteFile = exports.getFileById = exports.getFiles = exports.uploadFile = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const storage_1 = require("@google-cloud/storage");
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    storageBucket: 'your-bucket-name.appspot.com' // Substitua pelo nome do seu bucket
});
const db = firebase_admin_1.default.firestore();
const filesCollection = db.collection('files');
const storage = new storage_1.Storage();
const bucket = storage.bucket('your-bucket-name.appspot.com'); // Substitua pelo nome do seu bucket
// Função para fazer upload de um arquivo
const uploadFile = (file, uploadedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });
    return new Promise((resolve, reject) => {
        blobStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const docRef = yield filesCollection.add({
                filename: file.originalname,
                path: publicUrl,
                size: file.size,
                mimetype: file.mimetype,
                uploadedBy,
                createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp()
            });
            const doc = yield docRef.get();
            resolve(Object.assign({ id: doc.id }, doc.data()));
        }))
            .on('error', (err) => {
            reject(err);
        })
            .end(file.buffer);
    });
});
exports.uploadFile = uploadFile;
// Função para obter todos os arquivos
const getFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield filesCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getFiles = getFiles;
// Função para obter um arquivo específico
const getFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield filesCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Arquivo não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getFileById = getFileById;
// Função para deletar um arquivo
const deleteFile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = filesCollection.doc(id);
    const doc = yield docRef.get();
    if (!doc.exists) {
        throw new Error('Arquivo não encontrado');
    }
    const fileData = doc.data();
    const fileName = fileData.filename;
    yield bucket.file(fileName).delete();
    yield docRef.delete();
    return { id };
});
exports.deleteFile = deleteFile;
