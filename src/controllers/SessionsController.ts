import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import {compareSync} from 'bcrypt'
import User from '../models/User'
import {sign} from 'jsonwebtoken'


export default {
  async create(request: Request, response: Response) {
    const {email, password} = request.body

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail({email: email})

    if (compareSync(password, String(user.password))) {
      const token = sign({id: user.id}, String(process.env.SECRET), {expiresIn: '1h'})

      return response.status(201).json({ token: token });
    } else {
      response.status(400).json({ error: "Invalid password" });
    }



  }

}