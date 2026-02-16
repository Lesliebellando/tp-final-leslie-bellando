import { body, ValidationChain } from 'express-validator';


const descripcion: ValidationChain[] = [
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isString().withMessage('La descripción debe ser texto')
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),
];

const petId: ValidationChain[] = [
  body('petId')
    .notEmpty().withMessage('Debes indicar el ID de la mascota')
    .isMongoId().withMessage('El ID de la mascota no es válido'),
];


const fecha: ValidationChain[] = [
  body('fecha')
    .optional()
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD')
    .toDate(),
];


export const createMedicalValidator: ValidationChain[] = [
  ...descripcion,
  ...petId,
  ...fecha,
];


export const updateMedicalValidator: ValidationChain[] = [
  ...descripcion,
  ...fecha,
];