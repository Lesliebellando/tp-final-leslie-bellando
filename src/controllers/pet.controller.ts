import { Request, Response } from 'express';
import * as petService from '../services/pet.service';

/**
 * Controller to create a new pet.
 * * @param {Request} req - Express request object containing pet data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created pet or an error message.
 */

//Crear mascota createPet
export const createPet = async (req: Request, res: Response) => {
  try {
    console.log('Crear pet');
    const userId = req.user?.id || '';

    const petData = { ...req.body, vetId: userId };
    console.log(petData);
 const newPet = await petService.createPet(petData);
    return res.status(201).json(newPet);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message || 'Error al crear mascota' });
  }
};
/** 
 * * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of pets or an error message.
 */
//Traer todas las mascotas getAllPets
export const getAllPets = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || '';
    const role = req.user?.role || '';
    const pets = await petService.getAllPets(userId, role);
    return res.status(200).json(pets);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message || 'Error al obtener mascotas' });
  }
};
//Traer mascota por id  getPetById
/**
 * Controller to get a pet by its ID.
 * * @param {Request} req - Express request object containing the pet ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the pet data or an error message.
 */
export const getPetById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('Get pet by ID:', id);
    const userId = req.user?.id || '';
    const role = req.user?.role || '';
    const pet = await petService.getPetById(id, userId, role);

    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    return res.status(200).json(pet);
  } catch (error: any) {
 if (error.message.includes('No tienes permiso')) {
        return res.status(403).json({ error: error.message });
    }
    return res.status(500).json({ error: `Error al obtener la mascota ${id}` });
  }
};


//Actualizar mascota updatePet
/**
 * Controller to update an existing pet.
 * * @param {Request} req - Express request object containing the pet ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated pet or an error message.
 */
export const updatePet = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('updatePet', id);
    
    const userId = req.user?.id || '';
    const role = req.user?.role || '';
   const petData = req.body;

    const pet = await petService.updatePet(id, petData, userId, role);

    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada o sin permisos' });
    }

    return res.status(200).json(pet);
  } catch (error: any) {
    if (error.message.includes('No tienes permiso')) {
        return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: `Error al actualizar la mascota ${id}` });
  }
};

//Eliminar mascota deletePet
/**
 * Controller to delete a pet.
 * * @param {Request} req - Express request object containing the pet ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const deletePet = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('deletePet', id);
    const userId = req.user?.id || '';
    const role = req.user?.role || '';
    const deleted = await petService.deletePet(id, userId, role);

    if (!deleted) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    return res.status(200).json({ message: 'Mascota eliminada' });
  } catch (error: any) {
    if (error.message.includes('No tienes permiso')) {
        return res.status(403).json({ error: error.message }); }
    return res.status(500).json({ error: error.message || 'Error al eliminar mascota' });
  }
};