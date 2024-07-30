"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const motivoController_1 = require("../controllers/motivoController");
const router = (0, express_1.Router)();
router.post('/motivos', motivoController_1.createMotivo);
router.get('/motivos', motivoController_1.getMotivos);
router.get('/motivos/:id', motivoController_1.getMotivo);
router.patch('/motivos/:id', motivoController_1.updateMotivo);
router.delete('/motivos/:id', motivoController_1.deleteMotivo);
exports.default = router;
