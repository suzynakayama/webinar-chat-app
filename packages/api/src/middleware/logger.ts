import { RequestHandler } from 'express';

export const middlewarelogger: RequestHandler = (req, _res, next) => {
    console.log(req.url);
    next();
};
