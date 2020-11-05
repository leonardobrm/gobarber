import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const sessionRepository = getRepository(User);

    const user = await sessionRepository.findOne({
      where: { email },
    });

    if (!user) throw Error('Incorrect email/password combination');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw Error('Incorrect email/password combination');

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
