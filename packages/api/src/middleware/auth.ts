import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../utils/config';

export const middlewareAuth: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization; // Format of `Bearer 1231231...`

  const throwError = (msg: string, code = 401) => {
    return res.status(code).json({
      error: msg
    });
  };

  if (!bearer) return throwError('No JWT supplied');
  
  // test regex
  const reg = /^Bearer\s(.*)$/;
  if (!reg.test(bearer)) {
    return throwError('Incorrect JWT format');
  }

  // Returned array will have all bearer as index 0 and
  // only the parsed part as index 1. So we will get only the index 1.
  const token = reg.exec(bearer)![1];

  try {
    const secret:any = TOKEN_SECRET;
    res.locals.user = jwt.verify(token, secret);
  } catch (err) {
    return throwError('Invalid JWT');
  }
  
  next();
  return;
};