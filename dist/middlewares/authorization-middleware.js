"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthorizationMiddleware = void 0;
const base64auth = 'YWRtaW46cXdlcnR5';
const basicAuthorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const validHeader = `Basic ${base64auth}`;
    if (validHeader === authHeader) {
        next();
        return;
    }
    res.sendStatus(401);
};
exports.basicAuthorizationMiddleware = basicAuthorizationMiddleware;
