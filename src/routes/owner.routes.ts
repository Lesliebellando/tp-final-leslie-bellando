import { Router } from 'express';
import * as ownerController from '../controllers/owner.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import validateDto from '../middlewares/dto.middleware';
import { createOwnerValidator, updateOwnerValidator } from '../validators/owner.validator';
import { UserRole } from '../types/auth';

const router = Router();

router.use(authenticate, authorize([UserRole.ADMIN, UserRole.VETERINARIO]));


router.get('/', ownerController.getAllOwners);

router.get(
  '/:id',

  validateDto,
  ownerController.getOwnerById
);

router.post(
  '/',

  createOwnerValidator,
  validateDto,
  ownerController.createOwner
);

router.put(
  '/:id',
  updateOwnerValidator,
  validateDto,
  ownerController.updateOwner
);


router.delete(
  '/:id',
  ownerController.deleteOwner
);

export default router;