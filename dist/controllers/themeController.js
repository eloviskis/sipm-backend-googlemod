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
exports.deleteTheme = exports.updateTheme = exports.getTheme = exports.getThemes = exports.createTheme = void 0;
const theme_1 = __importDefault(require("../models/theme"));
const createTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = new theme_1.default(req.body);
        const savedTheme = yield theme.save();
        res.status(201).send(savedTheme);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createTheme = createTheme;
const getThemes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const themes = yield theme_1.default.find({});
        res.send(themes);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getThemes = getThemes;
const getTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = yield theme_1.default.findById(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        res.send(theme);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getTheme = getTheme;
const updateTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'layout', 'colors'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }
    try {
        const theme = yield theme_1.default.findById(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            if (update in theme) {
                theme[update] = req.body[update];
            }
        });
        yield theme.save();
        res.send(theme);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updateTheme = updateTheme;
const deleteTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theme = yield theme_1.default.findByIdAndDelete(req.params.id);
        if (!theme) {
            return res.status(404).send();
        }
        res.send(theme);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteTheme = deleteTheme;
