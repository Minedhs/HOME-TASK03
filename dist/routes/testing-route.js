"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/', (req, res) => {
    res.status(204).send("All data is deleted");
});
