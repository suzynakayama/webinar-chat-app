import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../utils/config';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1.Check if user already exists
  const user = await User.findOne({
    where: { email }
  });
  
  const throwError = () => {
    res.status(400).json({
      error: 'Invalid login credentials'
    });
    // important to leave an error msg that doesn't give details of what the error is,
    // don't say user not found, because hackers will now know that and be able to validate who is a user or who isn't.
  };

  if (!user) return throwError();

  // 2.Check password
  if (!bcrypt.compareSync(password, user.password)) return throwError();

  // 3.Generate token and encrypt user data in token
  const secret: any = TOKEN_SECRET;
  const { password: p, ...userData} = user.toJSON() as User;
  const token = jwt.sign(userData, secret);

  // 4.Send back the token

  res.json({
    token
  });
});
