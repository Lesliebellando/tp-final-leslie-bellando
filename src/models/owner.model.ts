import mongoose, { Document, Schema } from 'mongoose';

export interface IOwner extends Document {
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ownerSchema = new Schema<IOwner>(
  {
    nombre: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    direccion: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Owner = mongoose.model<IOwner>('Owner', ownerSchema);
