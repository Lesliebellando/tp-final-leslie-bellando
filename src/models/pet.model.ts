import mongoose, { Schema, Document } from 'mongoose';

export interface IPet extends Document {
  nombre: string;
  especie: string;
  raza?: string;
  fechaNacimiento?: Date;
  ownerId: mongoose.Types.ObjectId;
  vetId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>(
  {
    nombre: { type: String, required: true, trim: true },
    especie: { type: String, required: true, trim: true },
    raza: { type: String, trim: true },
    fechaNacimiento: { type: Date },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    vetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

petSchema.index({ ownerId: 1 });
petSchema.index({ vetId: 1 });

export const Pet = mongoose.model<IPet>('Pet', petSchema);
