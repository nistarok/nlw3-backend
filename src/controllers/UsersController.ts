import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User'


export default {

  async create(request: Request, response: Response) {
    const {name, email, password} = request.body
    const data = { name, email, password }

    const userRepository = getRepository(User);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().test("EmailExists", "Email ja existe", async (val) => {
        const res = await userRepository.findOne({ email: String(val) })
        return (res === undefined)
      } ),
      password: Yup.string()
      .required()

    })

    await schema.validate(data, {
      abortEarly: false
    })

    const user = userRepository.create(data)

    await userRepository.save(user);

    return response.status(201).json({ name, email, password });
  }

}