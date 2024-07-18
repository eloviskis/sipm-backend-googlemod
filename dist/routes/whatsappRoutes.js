"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsappController_1 = require("../controllers/whatsappController");
const router = (0, express_1.Router)();
router.post('/whatsapp/send', whatsappController_1.sendMessage);
exports.default = router;
