import { Request, Response } from 'express';
import * as recordService from '../services/medical-records.service';

/**
 * Controller to create a new medical record.
 * * @param {Request} req - Express request object containing medical record data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created record or an error message.
 */
export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    console.log('createMedicalRecord');
    
    const userId = req.user?.id || '';
    
    const recordData = { ...req.body, vetId: userId };

    const record = await recordService.createMedicalRecord(recordData);
    return res.status(201).json(record);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al crear historial clínico' });
  }
};

/**
 * Controller to get all medical records.
 * * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of records or an error message.
 */
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    console.log('getAllRecords');
    
    const userId = req.user?.id || '';
    const role = req.user?.role || '';

    const records = await recordService.getAllRecords(userId, role);
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener historiales' });
  }
};

/**
 * Controller to get medical records for a specific pet.
 * * @param {Request} req - Express request object containing petId in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of records or an error message.
 */
export const getMedicalRecordsByPet = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    try {
        console.log('getMedicalRecordsByPet', petId);
        
        const userId = req.user?.id || '';
        const role = req.user?.role || '';
        
        const records = await recordService.getMedicalRecordsByPet(petId, userId, role);
        return res.status(200).json(records);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener historiales de la mascota' });
    }
}

/**
 * Controller to get a medical record by its ID.
 * * @param {Request} req - Express request object containing record ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the record data or an error message.
 */
export const getMedicalRecordById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('getMedicalRecordById', id);
    
    const userId = req.user?.id || '';
    const role = req.user?.role || '';

    const record = await recordService.getMedicalRecordById(id, userId, role);

    if (!record) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }
    return res.status(200).json(record);
  } catch (error: any) {
    if (error.message.includes('No tienes acceso')) {
        return res.status(403).json({ error: error.message });
    }
    return res.status(500).json({ error: `Error al obtener historial ${id}` });
  }
};

/**
 * Controller to update an existing medical record.
 * * @param {Request} req - Express request object containing record ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated record or an error message.
 */
export const updateRecord = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('updateRecord', id);
    
    const userId = req.user?.id || '';
    const role = req.user?.role || '';
    
    const record = await recordService.updateRecord(id, req.body, userId, role);

    if (!record) {
      return res.status(404).json({ error: 'Historial no encontrado o sin permisos' });
    }
    return res.status(200).json(record);
  } catch (error: any) {
    if (error.message.includes('No puedes editar')) {
        return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: `Error al actualizar historial ${id}` });
  }
};

/**
 * Controller to delete a medical record.
 * * @param {Request} req - Express request object containing record ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const deleteRecord = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('deleteRecord', id);
    
    const userId = req.user?.id || '';
    const role = req.user?.role || '';

    const record = await recordService.deleteRecord(id, userId, role);

    if (!record) {
      return res.status(404).json({ error: 'Historial no encontrado o sin permisos' });
    }
    return res.status(200).json({ message: 'Historial eliminado!' });
  } catch (error: any) {
    if (error.message.includes('No puedes eliminar')) {
        return res.status(403).json({ error: error.message });
    }
    return res.status(500).json({ error: `Error al eliminar historial ${id}` });
  }
};