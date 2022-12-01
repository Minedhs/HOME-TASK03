"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => {
    res.status(200).send(posts_repository_1.postsRepository.findPosts());
});
exports.postsRouter.post('/', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newPost = posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (newPost) {
        res.status(201).send(newPost);
    }
});
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.delete('/:id', authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
        return;
    }
});
exports.postsRouter.put('/:id', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.titleValidation, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const isUpdated = posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!isUpdated) {
        res.sendStatus(404);
    }
    else {
        res.status(204).send(posts_repository_1.postsRepository.findPostById(req.params.id));
    }
});
