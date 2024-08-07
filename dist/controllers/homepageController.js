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
exports.getHomepageContent = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const db = firebase_admin_1.default.firestore();
const homepageContentDoc = db.collection('homepageContent').doc('mainContent');
// Função para obter o conteúdo da homepage
const getHomepageContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield homepageContentDoc.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Conteúdo da homepage não encontrado' });
        }
        const content = doc.data();
        (0, logger_1.default)('info', 'Conteúdo da homepage recuperado com sucesso.');
        res.status(200).send(Object.assign({ id: doc.id }, content));
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar conteúdo da homepage:', error);
        res.status(500).send({ error: 'Erro ao recuperar conteúdo da homepage.' });
    }
});
exports.getHomepageContent = getHomepageContent;
