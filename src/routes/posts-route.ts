import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware
} from "../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../middlewares/authorization-middleware";
import {blogsRepository} from "../repositories/blogs-repository";


export const postsRouter = Router()

postsRouter.get('/',(req: Request, res: Response) => {
    res.status(200).send(postsRepository.findPosts())
})
postsRouter.post('/', basicAuthorizationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if (newPost) {
        res.status(201).send(newPost)
    }
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.findPostById(req.params.id)
    if(post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.delete('/:id', basicAuthorizationMiddleware, (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
        return;
    }
})
postsRouter.put('/:id', basicAuthorizationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if (!isUpdated) {
        res.sendStatus(404)
    } else {
        res.status(204).send(postsRepository.findPostById(req.params.id))
    }
})
