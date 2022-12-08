import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection} from "../repositories/db";

export const testingRouter = Router()

testingRouter.delete('/',(req: Request, res: Response) => {
    blogsCollection.deleteMany({});
    postsCollection.deleteMany({});
    res.status(204).send("All data is deleted")
})