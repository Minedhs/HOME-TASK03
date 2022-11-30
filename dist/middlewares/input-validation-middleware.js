"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.blogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.webSiteUrlValidation = exports.descriptionValidation = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidation = (0, express_validator_1.body)('name')
    .isString().withMessage('name should be string')
    .trim().withMessage('name should be symbols string')
    .notEmpty().withMessage('name is required')
    .isLength({ max: 15 }).withMessage('max length is 15');
exports.descriptionValidation = (0, express_validator_1.body)('description')
    .isString().withMessage('description should be string')
    .trim().withMessage('description should be symbols string')
    .notEmpty().withMessage('description is required')
    .isLength({ max: 500 }).withMessage('max length is 500');
exports.webSiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString().withMessage('websiteUrl should be string')
    .trim().withMessage('websiteUrl should be symbols string')
    .notEmpty().withMessage('websiteUrl is required')
    .isLength({ max: 100 }).withMessage('max length is 100')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage('website url should be correct');
exports.titleValidation = (0, express_validator_1.body)('title')
    .isString().withMessage('title should be string')
    .trim().withMessage('title should be symbols string')
    .notEmpty().withMessage('title is required')
    .isLength({ max: 30 }).withMessage('max length is 30');
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString().withMessage('shortDescription should be string')
    .trim().withMessage('shortDescription should be symbols string')
    .notEmpty().withMessage('shortDescription is required')
    .isLength({ max: 100 }).withMessage('max length is 100');
exports.contentValidation = (0, express_validator_1.body)('content')
    .isString().withMessage('content should be string')
    .trim().withMessage('content should be symbols string')
    .notEmpty().withMessage('content is required')
    .isLength({ max: 1000 }).withMessage('max length is 1000');
exports.blogIdValidation = (0, express_validator_1.body)('blogId')
    .isString().withMessage('blogId should be string')
    .trim().withMessage('blogId should be symbols string')
    .notEmpty().withMessage('blogId is required');
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
