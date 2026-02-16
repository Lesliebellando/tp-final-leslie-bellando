import { IOwner, Owner } from '../models/owner.model';

interface CreateOwnerDTO {
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
}

export const createOwner = async (data: CreateOwnerDTO) => {
  const newOwner = new Owner(data);
  return await newOwner.save();
};

export const getAllOwners = async () => {return await Owner.find()};

export const getOwnerById = async (id: string) => {return await Owner.findById(id)};

export const updateOwner = async (id: string, data: Partial<IOwner>) => {
  return await Owner.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOwner = async (id: string) => {
  return await Owner.findByIdAndDelete(id);
};
