
import { IMedicalRecord, MedicalRecord } from '../models/medical-records.model';
import { UserRole } from '../types/auth';

interface CreateRecordDTO {
  diagnostico: string;
  tratamiento: string;
  descripcion: string;
  petId: string;
  vetId: string;
  fecha?: Date;
}


export const createMedicalRecord = async (data: CreateRecordDTO) => {
  const newRecord = new MedicalRecord(data);
  return await newRecord.save();
};
export const getAllRecords = async (userId: string, role: string) => {
  let query = {};
  if (role !== UserRole.ADMIN) {
    query = { vetId: userId };
  }

  return await MedicalRecord.find(query)
    .populate('petId', 'nombre especie')
    .populate('vetId', 'username');
};

export const getMedicalRecordsByPet = async (
  petId: string, userId: string, role: string) => {
  let query = {};
  if (role !== UserRole.ADMIN) {
    query = { vetId: userId };
  } return await MedicalRecord.find({ petId, ...query })
    .populate('vetId', 'username')
    .sort({ fecha: -1 });
};


export const getMedicalRecordById = async (id: string, userId: string, role: string) => {
  const record = await MedicalRecord.findById(id).populate('petId');
  if (!record) return null;

  if (role !== UserRole.ADMIN && record.vetId.toString() !== userId) {
    throw new Error('No tienes acceso a este registro médico');
  }
await record.populate('vetId', 'username');
  return record;
};



export const updateMedicalRecord = async (id: string, data: Partial<CreateRecordDTO>, userId: string, role: string) => {
  const record = await MedicalRecord.findById(id);
  if (!record) return null;

  if (role !== UserRole.ADMIN && record.vetId.toString() !== userId) {
    throw new Error('No puedes editar un historial que no creaste');
  }

  return await MedicalRecord.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMedicalRecord = async (id: string, userId: string, role: string) => {
  const record = await MedicalRecord.findById(id);
  if (!record) return null;

  if (role !== UserRole.ADMIN && record.vetId.toString() !== userId) {
    throw new Error('No puedes eliminar un historial que no creaste');
  }

  return await MedicalRecord.findByIdAndDelete(id);
};