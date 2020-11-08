import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticate from '../middleware/ensureAuthenticate';

const userRouter = Router();
const upload = multer(uploadConfig);
userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    // do not return the password
    user.password = 'secret';

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (req, res) => {
    return res.json({ ok: true });
  },
);

export default userRouter;
