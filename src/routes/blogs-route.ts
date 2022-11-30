import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {
    nameValidation,
    descriptionValidation,
    webSiteUrlValidation,
    inputValidationMiddleware
} from "../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../middlewares/authorization-middleware";


export const blogsRouter = Router()

blogsRouter.get('/',(req: Request, res: Response) => {
    res.status(200).send(blogsRepository.findBlogs())
})
blogsRouter.post('/', basicAuthorizationMiddleware, nameValidation, descriptionValidation, webSiteUrlValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const newBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
    if (newBlog) {
        res.status(201).send(newBlog)
    }
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = blogsRepository.findBlogById(req.params.id)
    if(blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }
})
blogsRouter.delete('/:id', basicAuthorizationMiddleware, (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
        return;
    }
})
blogsRouter.put('/:id', basicAuthorizationMiddleware, nameValidation, descriptionValidation, webSiteUrlValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (!isUpdated) {
        res.sendStatus(404)
    } else {
        res.status(204).send(blogsRepository.findBlogById(req.params.id))
    }
})
