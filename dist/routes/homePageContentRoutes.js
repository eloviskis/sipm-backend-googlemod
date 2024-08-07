"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homePageContentController_1 = require("../controllers/homePageContentController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', homePageContentController_1.getHomePageContent);
router.post('/', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permissionMiddleware)('ManageHomePageContent'), homePageContentController_1.updateHomePageContent);
exports.default = router;
