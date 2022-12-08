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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const authorization_middleware_1 = require("../middlewares/authorization-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield blogs_repository_1.blogsRepository.findBlogs();
    res.status(200).send(foundBlogs);
}));
exports.blogsRouter.post('/', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.webSiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let blog = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(blog);
    }
}));
exports.blogsRouter.delete('/:id', authorization_middleware_1.basicAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
exports.blogsRouter.put('/:id', authorization_middleware_1.basicAuthorizationMiddleware, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.webSiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!isUpdated) {
        res.sendStatus(404);
    }
    else {
        const blog = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
        res.status(204).send(blog);
    }
}));
