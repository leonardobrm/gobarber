import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
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

    const token = sign({}, 'efa0c692054ea66c82fb969c5fa41acc', {
      subject: user.id,
      expiresIn: '24h',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
