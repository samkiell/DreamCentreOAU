import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
