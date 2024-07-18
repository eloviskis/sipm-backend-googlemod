"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
router.post('/messages', messageController_1.sendMessage);
router.get('/messages/:userId', messageController_1.getMessages);
exports.default = router;
