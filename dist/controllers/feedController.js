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
exports.createFeedItem = exports.getFeedItems = void 0;
const feedItem_1 = __importDefault(require("../models/feedItem")); // Certifique-se de criar o modelo FeedItem
// Função para obter itens do feed
const getFeedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedItems = yield feedItem_1.default.find();
        res.status(200).send(feedItems);
    }
    catch (error) {
        res.status(500).send({ error: 'Erro ao obter itens do feed' });
    }
});
exports.getFeedItems = getFeedItems;
// Função para criar um novo item do feed
const createFeedItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedItem = new feedItem_1.default(req.body);
        yield feedItem.save();
        res.status(201).send(feedItem);
    }
    catch (error) {
        res.status(400).send({ error: 'Erro ao criar item do feed' });
    }
});
exports.createFeedItem = createFeedItem;
