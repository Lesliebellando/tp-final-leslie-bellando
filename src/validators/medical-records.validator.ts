import { body, ValidationChain } from 'express-validator';
const diagnostico: ValidationChain = body('diagnostico')
    .trim()
    .notEmpty().withMessage('El diagnóstico es obligatorio')
    .isString().withMessage('El diagnóstico debe ser texto')
    .isLength({ min: 3, max: 100 }).withMessage('El diagnóstico debe tener entre 3 y 100 caracteres');

const tratamiento: ValidationChain = body('tratamiento')
    .trim()
    .notEmpty().withMessage('El tratamiento es obligatorio')
    .isString().withMessage('El tratamiento debe ser texto');

const descripcion: ValidationChain = body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria')
    .isString()
    .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres');

const fecha: ValidationChain = body('fecha')
    .optional()
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD')
    .toDate();

const petId: ValidationChain = body('petId')
    .notEmpty().withMessage('Debes indicar el ID de la mascota')
    .isMongoId().withMessage('El ID de la mascota no es válido');


// 1. Crear: Todo es obligatorio (menos fecha que es opcional y vetId que lo pone el sistema)
export const createMedicalValidator: ValidationChain[] = [
    diagnostico,
    tratamiento,
    descripcion,
    petId,
    fecha,
];

// 2. Actualizar: Todo es opcional (solo valida si el usuario envía el dato)
export const updateMedicalValidator: ValidationChain[] = [
    body('diagnostico').optional().trim().isString().isLength({ min: 3, max: 100 }),
    body('tratamiento').optional().trim().isString(),
    body('descripcion').optional().trim().isString().isLength({ min: 10, max: 500 }),
    body('fecha').optional().isISO8601().toDate(),
];