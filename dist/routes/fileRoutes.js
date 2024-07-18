"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Rota para upload de documentos
router.post('/upload', upload.single('file'), fileController_1.uploadDocument);
exports.default = router;
