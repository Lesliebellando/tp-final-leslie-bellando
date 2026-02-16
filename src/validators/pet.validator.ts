import { body, ValidationChain } from 'express-validator';


const nombre: ValidationChain[] = [
  body('nombre')
    .notEmpty().withMessage('El nombre de la mascota es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
];

const especie: ValidationChain[] = [
  body('especie')
    .notEmpty().withMessage('La especie es obligatoria (ej: perro, gato)')
    .isString().trim(),
];

const raza: ValidationChain[] = [
  body('raza')
    .optional()
    .isString().trim(),
];

const fechaNacimiento: ValidationChain[] = [
  body('fechaNacimiento')
    .optional()
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD')
    .toDate(),
];

const nombreDueno: ValidationChain[] = [
  body('nombreDueno')
    .notEmpty().withMessage('El nombre del dueño es obligatorio')
    .isString().trim()
    .isLength({ min: 3 }).withMessage('El nombre del dueño es muy corto'),
];

const telefonoDueno: ValidationChain[] = [
  body('telefonoDueno')
    .notEmpty().withMessage('El teléfono del dueño es obligatorio')
    .isString().trim(),
];


export const createPetValidator: ValidationChain[] = [
  ...nombre,
  ...especie,
  ...raza,
  ...fechaNacimiento,
  ...nombreDueno,
  ...telefonoDueno,
];


export const updatePetValidator: ValidationChain[] = [
  ...nombre,
  ...especie,
  ...raza,
  ...fechaNacimiento,
  ...nombreDueno,
  ...telefonoDueno,
];