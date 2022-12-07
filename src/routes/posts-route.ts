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
export const postsRouter = Router()

postsRouter.get('/',async (req: Request, res: Response) => {
    const foundPosts = await postsRepository.findPosts()
    res.status(200).send(foundPosts)
})
postsRouter.post('/', basicAuthorizationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const newPost = await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
    })
postsRouter.get('/:id', async (req: Request, res: Response) => {
    let post = await postsRepository.findPostById(req.params.id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.delete('/:id', basicAuthorizationMiddleware, async (req: Request, res: Response) => {
    const isDeleted: boolean = await postsRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
        return;
    }
})
postsRouter.put('/:id', basicAuthorizationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if (!isUpdated) {
        res.sendStatus(404)
    } else {
        res.status(204).send(postsRepository.findPostById(req.params.id))
    }
})