"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const testing_route_1 = require("./routes/testing-route");
const app = (0, express_1.default)();
const port = process.env.PORT || 5003;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use((0, body_parser_1.default)());
app.use('/blogs', blogs_route_1.blogsRouter);
app.use('/posts', posts_route_1.postsRouter);
app.use('testing/all-ata', testing_route_1.testingRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
