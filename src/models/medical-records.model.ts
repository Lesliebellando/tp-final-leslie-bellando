import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicalRecord extends Document {
  diagnostico: string;
  descripcion: string;
  tratamiento: string;
  fecha: Date;
  petId: mongoose.Types.ObjectId;
  vetId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const medicalRecordSchema = new Schema<IMedicalRecord>(
  {
    diagnostico: { type: String, required: true, trim: true },
    tratamiento: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    fecha: { type: Date, default: Date.now },
    petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    vetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

medicalRecordSchema.index({ petId: 1 });
medicalRecordSchema.index({ vetId: 1 });

export const MedicalRecord = mongoose.model<IMedicalRecord>(
  'MedicalRecord',
  medicalRecordSchema
);



// export interface MedicalRecordData {
//   id: string;
//   descripcion: string;
//   fecha: Date;
//   petId: string;
//   vetId: string;
// }

// // Crear historia clínica
// export const createMedicalRecord = async (
//   data: Omit<MedicalRecordData, 'id' | 'fecha'>
// ): Promise<string> => {
//   const newMedicalRecord = new MedicalRecord({
//     descripcion: data.descripcion,
//     petId: data.petId,
//     vetId: data.vetId,
//   });
//   const saved = await newMedicalRecord.save();
//   return saved._id.toString();
// };

// // Buscar historias de una mascota
// export const findMedicalRecordsByPet = async (petId: string): Promise<MedicalRecordData[]> => {
//   const histories = await MedicalRecord.find({ petId }).lean();
  
//   return histories.map(h => ({
//     id: h._id.toString(),
//     descripcion: h.descripcion,
//     fecha: h.fecha,
//     petId: h.petId.toString(),
//     vetId: h.vetId.toString()
//   }));
// };

// // 3. Buscar una historia por ID (Para editarla o ver detalle)
// export const findMedicalRecordById = async (id: string): Promise<MedicalRecordData | null> => {
//   const h = await MedicalRecord.findById(id).lean();
//   if (!h) return null;

//   return {
//     id: h._id.toString(),
//     descripcion: h.descripcion,
//     fecha: h.fecha,
//     petId: h.petId.toString(),
//     vetId: h.vetId.toString()
//   };
// };

// // 4. Actualizar (Solo el veterinario usará esto)
// export const updateMedicalRecord = async (id: string, data: Partial<MedicalRecordData>): Promise<MedicalRecordData | null> => {
//   const h = await MedicalRecord.findByIdAndUpdate(id, data, { new: true }).lean();
//   if (!h) return null;
  
//   return {
//     id: h._id.toString(),
//     descripcion: h.descripcion,
//     fecha: h.fecha,
//     petId: h.petId.toString(),
//     vetId: h.vetId.toString()
//   };
// };

// // 5. Borrar
// export const deleteMedicalRecord = async (id: string): Promise<boolean> => {
//   const result = await MedicalRecord.findByIdAndDelete(id);
//   return !!result;
// };