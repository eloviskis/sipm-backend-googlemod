"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoiceController_1 = require("../controllers/invoiceController");
const router = (0, express_1.Router)();
router.post('/invoices', (req, res) => (0, invoiceController_1.createInvoice)(req, res));
exports.default = router;
