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
exports.deletePermission = exports.updatePermission = exports.getPermissionById = exports.getPermissions = exports.createPermission = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Inicializa o Firebase Admin SDK (certifique-se de que está configurado corretamente)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault()
});
const db = firebase_admin_1.default.firestore();
const permissionsCollection = db.collection('permissions');
// Função para criar uma nova permissão
const createPermission = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield permissionsCollection.add(Object.assign(Object.assign({}, data), { createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp(), updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.createPermission = createPermission;
// Função para obter todas as permissões
const getPermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield permissionsCollection.get();
    return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getPermissions = getPermissions;
// Função para obter uma permissão específica
const getPermissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield permissionsCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Permissão não encontrada');
    }
    return Object.assign({ id: doc.id }, doc.data());
});
exports.getPermissionById = getPermissionById;
// Função para atualizar uma permissão
const updatePermission = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = permissionsCollection.doc(id);
    yield docRef.update(Object.assign(Object.assign({}, data), { updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
    const doc = yield docRef.get();
    return Object.assign({ id: doc.id }, doc.data());
});
exports.updatePermission = updatePermission;
// Função para deletar uma permissão
const deletePermission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = permissionsCollection.doc(id);
    yield docRef.delete();
    return { id };
});
exports.deletePermission = deletePermission;
