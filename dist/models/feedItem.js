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
exports.deleteFeedItem = exports.updateFeedItem = exports.getFeedItemById = exports.getFeedItems = exports.createFeedItem = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const feedItemsCollection = db.collection('feedItems');
// Função para criar um novo item de feed
const createFeedItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield feedItemsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createFeedItem = createFeedItem;
// Função para obter todos os itens de feed
const getFeedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield feedItemsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getFeedItems = getFeedItems;
// Função para obter um item de feed específico
const getFeedItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield feedItemsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Item de feed não encontrado');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getFeedItemById = getFeedItemById;
// Função para atualizar um item de feed
const updateFeedItem = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = feedItemsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateFeedItem = updateFeedItem;
// Função para deletar um item de feed
const deleteFeedItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = feedItemsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteFeedItem = deleteFeedItem;
