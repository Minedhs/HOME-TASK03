import {Request, Response, NextFunction} from "express";

const base64auth = 'YWRtaW46cXdlcnR5'

export const basicAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const validHeader = `Basic ${base64auth}`

    if (validHeader === authHeader) {
        next()
        return
    }
    res.sendStatus(401)
}