import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {
    nameValidation,
    descriptionValidation,
    webSiteUrlValidation,
    inputValidationMiddleware
} from "../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../middlewares/authorization-middleware";
import {BlogType} from "../repositories/db";


export const blogsRouter = Router()

blogsRouter.get('/',async (req: Request, res: Response) => {
    const foundBlogs = await blogsRepository.findBlogs()
    res.status(200).send(foundBlogs)
})
blogsRouter.post('/', basicAuthorizationMiddleware, nameValidation, descriptionValidation, webSiteUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newBlog: BlogType = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
        res.status(201).send(newBlog)
})
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    let blog = await blogsRepository.findBlogById(req.params.id)
    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }
})
blogsRouter.delete('/:id', basicAuthorizationMiddleware, async (req: Request, res: Response) => {
    const isDeleted: boolean = await blogsRepository.deleteBlog(req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
        return;
    }
})
blogsRouter.put('/:id', basicAuthorizationMiddleware, nameValidation, descriptionValidation, webSiteUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated: boolean = await blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (!isUpdated) {
        res.sendStatus(404)
    } else {
        const blog = await blogsRepository.findBlogById(req.params.id)
        res.status(204).send(blog)
    }
})
