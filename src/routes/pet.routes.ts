import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authenticate,authorize } from '../middlewares/auth.middleware'; // <--- El guardián
import { createPetValidator, updatePetValidator } from '../validators/pet.validator';
import validateDto from '../middlewares/dto.middleware';
import { UserRole } from '../types/auth';

const router = Router();


// Todas las rutas de abajo requieren estar logueado
router.use(authenticate, authorize([UserRole.ADMIN, UserRole.VETERINARIO]));


router.post('/', createPetValidator, validateDto, 
  petController.createPet);

router.get('/', petController.getAllPets); 
router.get('/:id', petController.getPetById); 

router.put('/:id', updatePetValidator, validateDto, petController.updatePet);

router.delete('/:id', petController.deletePet);
export default router;