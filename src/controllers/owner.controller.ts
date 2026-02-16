import { Request, Response } from 'express';
import * as ownerService from '../services/owner.service';

/**
 * Controller to create a new owner.
 * * @param {Request} req - Express request object containing owner data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created owner or an error message.
 */
export const createOwner = async (req: Request, res: Response) => {
  try {
    console.log('createOwner');
    const ownerData = req.body;
    console.log(ownerData);

    const owner = await ownerService.createOwner(ownerData);
    return res.status(201).json(owner);
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: error.message || 'Error al crear dueño' });
  }
};

/**
 * Controller to get all owners.
 * * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of owners or an error message.
 */
export const getAllOwners = async (_req: Request, res: Response) => {
  try {
    console.log('getAllOwners');
    const owners = await ownerService.getAllOwners();
    return res.status(200).json(owners);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Error al listar dueños' });
  }
};

/**
 * Controller to get an owner by ID.
 * * @param {Request} req - Express request object containing owner ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the owner data or an error message.
 */
export const getOwnerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('getOwnerById', id);
    const owner = await ownerService.getOwnerById(id);
    if (!owner) return res.status(404).json({ error: 'Dueño no encontrado' });
    return res.status(200).json(owner);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || `Error al buscar dueño ${id}` });
  }
};


/**
 * Controller to update an existing owner.
 * * @param {Request} req - Express request object containing owner ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated owner or an error message.
 */
export const updateOwner = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('updateOwner', id);
    const ownerData = req.body;
    
    const owner = await ownerService.updateOwner(id, ownerData);
    if (!owner) return res.status(404).json({ error: 'Dueño no encontrado' });
    return res.status(200).json(owner);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar dueño' });
  }
};

/**
 * Controller to delete an owner.
 * * @param {Request} req - Express request object containing owner ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const deleteOwner = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('deleteOwner', id);
  
    const  owner = await ownerService.deleteOwner(id);
  if (!owner) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }
    return res.status(200).json({ message: 'Dueño eliminado!' });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar el dueño ${id}` });
  }
};
