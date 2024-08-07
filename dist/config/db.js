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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const serviceAccount = require('./serviceAccountKeyGFire.json');
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount)
    });
    const db = firebase_admin_1.default.firestore();
    try {
        yield db.settings({ timestampsInSnapshots: true });
        (0, logger_1.default)('info', 'Conexão com o Firestore estabelecida com sucesso');
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao conectar ao Firestore:', error);
        process.exit(1);
    }
});
exports.default = connectDB;
