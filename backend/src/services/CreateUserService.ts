import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../error/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) throw new AppError('Email address already used.');

    if(password.length < 6) {
      throw new AppError('The password must contain at least 6 characters');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
