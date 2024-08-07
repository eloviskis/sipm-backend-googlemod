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
exports.deleteNotification = exports.updateNotification = exports.getNotificationById = exports.getNotifications = exports.createNotification = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const notificationsCollection = db.collection('notifications');
// Função para criar uma nova notificação
const createNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield notificationsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createNotification = createNotification;
// Função para obter todas as notificações
const getNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield notificationsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getNotifications = getNotifications;
// Função para obter uma notificação específica
const getNotificationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield notificationsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Notificação não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getNotificationById = getNotificationById;
// Função para atualizar uma notificação
const updateNotification = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = notificationsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updateNotification = updateNotification;
// Função para deletar uma notificação
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = notificationsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deleteNotification = deleteNotification;
