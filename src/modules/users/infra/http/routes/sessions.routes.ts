import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();


sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();
  const { email, password } = req.body;

  const autenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await autenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
