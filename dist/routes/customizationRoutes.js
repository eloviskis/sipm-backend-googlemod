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
const express_1 = require("express");
const firestore_1 = require("firebase/firestore");
const upload_1 = __importDefault(require("../middlewares/upload")); // Importar o middleware de upload
const app_1 = require("firebase/app");
// Configuração do Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Inicializar Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
const router = (0, express_1.Router)();
// Rota para atualizar o tema
router.put('/theme', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { theme } = req.body;
    try {
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'settings', 'theme'), { theme });
        res.status(200).send({ message: 'Tema atualizado com sucesso' });
    }
    catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar tema' });
    }
}));
// Rota para fazer upload do favicon
router.post('/favicon', upload_1.default.single('favicon'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'Nenhum arquivo enviado' });
    }
    res.status(200).send({ message: 'Favicon enviado com sucesso', filePath: `/uploads/${req.file.filename}` });
});
exports.default = router;
