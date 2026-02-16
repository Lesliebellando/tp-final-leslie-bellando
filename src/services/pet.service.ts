
import { IPet, Pet } from '../models/pet.model';
import { UserRole} from '../types/auth';

interface CreatePetDTO {
  nombre: string;
  especie: string;
  raza?: string;
  fechaNacimiento?: Date;
  ownerId: string;
  vetId: string; 
}

export const getAllPets = async (userId: string, role: string) => {
  let query = {};

  if (role !== UserRole.ADMIN) {
    query = { vetId: userId };
  }

  return await Pet.find(query)
    .populate('ownerId', 'nombre telefono email')
    .populate('vetId', 'username email');
};

export const getPetById = async (id: string, userId: string, role: string) => {
  const pet = await Pet.findById(id).populate('ownerId');
  
  if (!pet) return null;

  // Si es veterinario y la mascota no es suya no va poder verla
  if (role !== UserRole.ADMIN && pet.vetId.toString() !== userId) {
    throw new Error('No tienes permiso para ver esta mascota');
  }
await pet.populate('vetId', 'username email');
  return pet;
};

export const createPet = async (data: CreatePetDTO) => {
  const newPet = new Pet(data);
  return await newPet.save();
};


export const updatePet = async (id: string, data: Partial<IPet>, userId: string, role: string) => {
  const pet = await Pet.findById(id);
  if (!pet) return null;
  if (role !== UserRole.ADMIN && pet.vetId.toString() !== userId) {
    throw new Error('No tienes permiso para editar esta mascota');
  }

  return await Pet.findByIdAndUpdate(id, data, { new: true });
};

export const deletePet = async (id: string, userId: string, role: string) => {
  const pet = await Pet.findById(id);
  if (!pet) return null;
  if (role !== UserRole.ADMIN && pet.vetId.toString() !== userId) {
    throw new Error('No tienes permiso para eliminar esta mascota');
  }

  return await Pet.findByIdAndDelete(id);
};
