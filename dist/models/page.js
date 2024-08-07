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
exports.deletePage = exports.updatePage = exports.getPageById = exports.getPages = exports.createPage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const pagesCollection = db.collection('pages');
// Função para criar uma nova página
const createPage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield pagesCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createPage = createPage;
// Função para obter todas as páginas
const getPages = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield pagesCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getPages = getPages;
// Função para obter uma página específica
const getPageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield pagesCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Página não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getPageById = getPageById;
// Função para atualizar uma página
const updatePage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = pagesCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updatePage = updatePage;
// Função para deletar uma página
const deletePage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = pagesCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deletePage = deletePage;
