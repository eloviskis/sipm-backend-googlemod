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
exports.getToken = exports.createRoom = void 0;
const telemedicineService_1 = require("../services/telemedicineService");
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, telemedicineService_1.createVideoRoom)(req.body.roomName);
        res.status(201).send(room);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createRoom = createRoom;
const getToken = (req, res) => {
    try {
        const token = (0, telemedicineService_1.generateVideoToken)(req.body.identity);
        res.send({ token });
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.getToken = getToken;
