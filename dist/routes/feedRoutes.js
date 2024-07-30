"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedController_1 = require("../controllers/feedController");
const router = (0, express_1.Router)();
router.get('/feed', feedController_1.getFeedItems);
router.post('/feed', feedController_1.createFeedItem);
exports.default = router;
