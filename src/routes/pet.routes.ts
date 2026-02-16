import { Router } from 'express';
import * as petController from '../controllers/pet.controller';
import { authenticate,authorize } from '../middlewares/auth.middleware'; // <--- El guardián
import { createPetValidator, updatePetValidator } from '../validators/pet.validator';
import validateDto from '../middlewares/dto.middleware';
const router = Router();


// Todas las rutas de abajo requieren estar logueado
router.use(authenticate, authorize(['user'])); 

router.post('/', authenticate, authorize(['user']), createPetValidator, 
  validateDto, 
  petController.createPet, petController.createPet);

router.get('/', authenticate, authorize(['user']), petController.getAllPets); 
router.get('/:id', authenticate, authorize(['user']), petController.getPetById); 

router.put('/:id', updatePetValidator, validateDto, petController.updatePet);

router.delete('/:id', authenticate, authorize(['user']), petController.deletePet);
export default router;