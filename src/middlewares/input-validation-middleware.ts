import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {blogsRepository} from "../repositories/blogs-repository";

export const nameValidation =  body('name')
    .isString().withMessage('name should be string')
    .trim().withMessage('name should be symbols string')
    .notEmpty().withMessage('name is required')
    .isLength({max: 15}).withMessage('max length is 15');
export const descriptionValidation =  body('description')
    .isString().withMessage('description should be string')
    .trim().withMessage('description should be symbols string')
    .notEmpty().withMessage('description is required')
    .isLength({max: 500}).withMessage('max length is 500');
export const webSiteUrlValidation =  body('websiteUrl')
    .isString().withMessage('websiteUrl should be string')
    .trim().withMessage('websiteUrl should be symbols string')
    .notEmpty().withMessage('websiteUrl is required')
    .isLength({max: 100}).withMessage('max length is 100')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage('website url should be correct');

export const titleValidation = body('title')
    .isString().withMessage('title should be string')
    .trim().withMessage('title should be symbols string')
    .notEmpty().withMessage('title is required')
    .isLength({max: 30}).withMessage('max length is 30');
export const shortDescriptionValidation = body('shortDescription')
    .isString().withMessage('shortDescription should be string')
    .trim().withMessage('shortDescription should be symbols string')
    .notEmpty().withMessage('shortDescription is required')
    .isLength({max: 100}).withMessage('max length is 100');
export const contentValidation = body('content')
    .isString().withMessage('content should be string')
    .trim().withMessage('content should be symbols string')
    .notEmpty().withMessage('content is required')
    .isLength({max: 1000}).withMessage('max length is 1000');
export const blogIdValidation = body('blogId')
    .isString().withMessage('blogId should be string')
    .trim().withMessage('blogId should be symbols string')
    .notEmpty().withMessage('blogId is required')
    .custom((blogId) => {
        const findBlogId = blogsRepository.findBlogById(blogId);
        if (findBlogId) {
            return true
        } else{}
    }).withMessage('blogId is incorrect');


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            errorsMessages: errors.array({onlyFirstError:true}).map(e => ({
                message: e.msg,
                field: e.param
            }))
        });
    } else {
        next()
    }
}
