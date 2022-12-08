"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const db_1 = require("../repositories/db");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/', (req, res) => {
    db_1.blogsCollection.deleteMany({});
    db_1.postsCollection.deleteMany({});
    res.status(204).send("All data is deleted");
});
