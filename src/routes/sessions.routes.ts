import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const autenticateUser = new AuthenticateUserService();

    const { user, token } =  await autenticateUser.execute({
      email,
      password
    });

    delete user.password;

    return res.json({ user, token })

  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
