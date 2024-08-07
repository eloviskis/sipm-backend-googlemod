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
// src/routes/customization.ts
const express_1 = require("express");
const upload_1 = __importDefault(require("../upload"));
const firestore_1 = require("@google-cloud/firestore");
// Inicializar Firestore
const firestore = new firestore_1.Firestore();
const router = (0, express_1.Router)();
router.post('/customization', upload_1.default.single('favicon'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { theme } = req.body;
        let faviconUrl = '';
        if (req.file) {
            // Se o arquivo favicon foi enviado, crie a URL do favicon
            faviconUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }
        // Atualizar Firestore com o tema e o favicon
        yield firestore.collection('settings').doc('customization').set(Object.assign({ theme }, (faviconUrl && { favicon: faviconUrl })), { merge: true });
        res.status(200).json({ message: 'Customização atualizada com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar customização:', error);
        res.status(500).json({ message: 'Erro ao atualizar customização' });
    }
}));
exports.default = router;
