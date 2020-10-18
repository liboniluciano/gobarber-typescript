import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import User from "../models/User";
import { sign } from "jsonwebtoken";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
       where: { email }
    });

    if(!user){
      throw new Error('Incorret email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorret email/password combination');
    }

    const token = sign({}, 'ba3e43a2e52a814152fd592216657c50', {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;
