import {Request, Response, Router} from "express";

export const testingRouter = Router()

testingRouter.delete('/', (req: Request, res: Response) => {
    res.status(204).send("All data is deleted")
})