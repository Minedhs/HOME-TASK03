"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPosts = yield posts_repository_1.postsRepository.findPosts();
    res.status(200).send(foundPosts);
}));
exports.postsRouter.post('/', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).send(newPost);
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield posts_repository_1.postsRepository.findPostById(req.params.id);
    if (!post) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(post);
    }
}));
exports.postsRouter.delete('/:id', authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
exports.postsRouter.put('/:id', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!isUpdated) {
        res.sendStatus(404);
    }
    else {
        res.status(204).send(posts_repository_1.postsRepository.findPostById(req.params.id));
    }
}));
