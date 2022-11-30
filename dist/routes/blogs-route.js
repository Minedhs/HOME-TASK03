"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogs_repository_1.blogsRepository.findBlogs());
});
exports.blogsRouter.post('/', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.webSiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    if (newBlog) {
        res.status(201).send(newBlog);
    }
});
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogsRouter.delete('/:id', authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
        return;
    }
});
exports.blogsRouter.put('/:id', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.webSiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const isUpdated = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!isUpdated) {
        res.sendStatus(404);
    }
    else {
        res.status(204).send(blogs_repository_1.blogsRepository.findBlogById(req.params.id));
    }
});
