import { body } from 'express-validator';

export const createOwnerValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre es muy corto'),

  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es obligatorio'),
    
  body('direccion')
    .optional()
    .trim()
    .isString(),
];

export const updateOwnerValidator = [
  // En update todos son opcionales, pero si vienen, deben ser válidos
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre es muy corto'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Debe ser un email válido'),

  body('telefono')
    .optional()
    .trim()
    .notEmpty(),
];