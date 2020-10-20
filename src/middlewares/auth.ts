import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'


interface decodedUser {
  id: string
}


export default function verifyJWT(req: Request, res: Response, next: NextFunction) {

  var token = String(req.headers['x-access-token']);

  verify(token, String(process.env.SECRET), (err, decoded) => {
    if (err){
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    const decoded_user = decoded as decodedUser
    if (decoded_user)
      req.userId = decoded_user.id
    next();
  });
}