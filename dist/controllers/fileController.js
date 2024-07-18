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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = void 0;
const googleDriveService_1 = require("../services/googleDriveService");
const uploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ error: 'Nenhum arquivo enviado.' });
        }
        const result = yield (0, googleDriveService_1.uploadFile)(file);
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.uploadDocument = uploadDocument;
