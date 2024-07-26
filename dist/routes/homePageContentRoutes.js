"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homePageContentController_1 = require("../controllers/homePageContentController");
const router = (0, express_1.Router)();
router.get('/', homePageContentController_1.getHomePageContent);
router.post('/', homePageContentController_1.updateHomePageContent);
exports.default = router;
