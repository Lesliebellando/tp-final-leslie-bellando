import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware'; 
import * as medicalController from '../controllers/medical-record.controller';
import { createMedicalValidator, updateMedicalValidator } from '../validators/medical-records.validator';
import validateDto from '../middlewares/dto.middleware';

const router = Router();

// Middleware de autenticación para todas las rutas de este router
router.use(authenticate, authorize(['user'])); // Solo veterinarios y admins pueden acceder


router.get('/pet/:petId', medicalController.getMedicalRecordsByPet); // Ver historial de un perro
router.get('/:id', medicalController.getMedicalRecordById);

router.post('/', createMedicalValidator, validateDto, 
  medicalController.createMedicalRecord);

router.put('/:id', updateMedicalValidator, medicalController.updateMedicalRecord);
router.delete('/:id', medicalController.deleteMedicalRecord);

export default router;