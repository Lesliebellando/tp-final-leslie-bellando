import { body, ValidationChain } from 'express-validator';


const nombreChain = body('nombre')
  .trim()
  .notEmpty().withMessage('El nombre de la mascota es obligatorio')
  .isString().withMessage('El nombre debe ser texto')
  .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres');

const especieChain = body('especie')
  .trim()
  .notEmpty().withMessage('La especie es obligatoria (ej: perro, gato)')
  .isString();

const razaChain = body('raza')
  .optional()
  .trim()
  .isString();

const fechaNacimientoChain = body('fechaNacimiento')
  .optional()
  .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD')
  .toDate();

// Se valida el ownerId
const ownerIdChain = body('ownerId')
  .notEmpty().withMessage('El ID del dueño es obligatorio')
  .isMongoId().withMessage('El ID del dueño no es válido');


export const createPetValidator: ValidationChain[] = [
  nombreChain,
  especieChain,
  razaChain,
  fechaNacimientoChain,
  ownerIdChain, // Validamos que venga el ID del dueño
];

export const updatePetValidator: ValidationChain[] = [
  
  body('nombre').optional().trim().isString().isLength({ min: 2 }),
  body('especie').optional().trim().isString(),
 
  razaChain,
  fechaNacimientoChain,
  
  //cambiar de dueño si es necesario 
  body('ownerId').optional().isMongoId(),
];