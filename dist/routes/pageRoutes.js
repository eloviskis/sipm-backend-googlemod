"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageController_1 = require("../controllers/pageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/pages', authMiddleware_1.authMiddleware, pageController_1.createPage);
router.get('/pages', authMiddleware_1.authMiddleware, pageController_1.getPages);
router.get('/pages/:id', authMiddleware_1.authMiddleware, pageController_1.getPage);
router.patch('/pages/:id', authMiddleware_1.authMiddleware, pageController_1.updatePage);
router.delete('/pages/:id', authMiddleware_1.authMiddleware, pageController_1.deletePage);
exports.default = router;
