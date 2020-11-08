import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticate from '../middleware/ensureAuthenticate';

const userRouter = Router();
const upload = multer(uploadConfig);
userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (req, res) => {
    const { filename } = req.file;
    const { id } = req.user;

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });

    return res.json(user);
  },
);

export default userRouter;
