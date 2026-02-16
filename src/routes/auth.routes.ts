import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';
import validateDto from '../middlewares/dto.middleware';


const router = Router();

//Rutas públicas de autenticación

router.post('/register', registerValidator, validateDto, register);
router.post('/login', loginValidator, validateDto, login);

export default router;