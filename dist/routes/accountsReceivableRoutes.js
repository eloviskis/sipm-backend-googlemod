"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountsReceivableController_1 = require("../controllers/accountsReceivableController");
const router = (0, express_1.Router)();
router.post('/accounts-receivable', accountsReceivableController_1.createAccountReceivable);
router.get('/accounts-receivable', accountsReceivableController_1.getAccountsReceivable);
router.get('/accounts-receivable/:id', accountsReceivableController_1.getAccountReceivable);
router.patch('/accounts-receivable/:id', accountsReceivableController_1.updateAccountReceivable);
router.delete('/accounts-receivable/:id', accountsReceivableController_1.deleteAccountReceivable);
exports.default = router;
