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
exports.deletePage = exports.updatePage = exports.getPage = exports.getPages = exports.createPage = void 0;
const page_1 = __importDefault(require("../models/page"));
const createPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = new page_1.default(req.body);
        yield page.save();
        res.status(201).send(page);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createPage = createPage;
const getPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield page_1.default.find({});
        res.send(pages);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPages = getPages;
const getPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield page_1.default.findById(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPage = getPage;
const updatePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const page = yield page_1.default.findById(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        updates.forEach((update) => page.set(update, req.body[update]));
        yield page.save();
        res.send(page);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updatePage = updatePage;
const deletePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield page_1.default.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deletePage = deletePage;
