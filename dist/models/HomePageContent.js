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
exports.getHomePageContent = exports.setHomePageContent = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const homePageContentCollection = db.collection('homePageContent');
// Função para criar ou atualizar o conteúdo da página inicial
const setHomePageContent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = homePageContentCollection.doc('mainContent');
    yield docRef.set(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }), { merge: true });
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.setHomePageContent = setHomePageContent;
// Função para obter o conteúdo da página inicial
const getHomePageContent = () => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = homePageContentCollection.doc('mainContent');
    const doc = yield docRef.get();
    if (!doc.exists) {
        throw new Error('Conteúdo da página inicial não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getHomePageContent = getHomePageContent;
