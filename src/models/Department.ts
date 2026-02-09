import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string; // e.g., "SWE"
  facultyId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    facultyId: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  },
  {
    timestamps: true,
  }
);

// Index for filtering departments by faculty
DepartmentSchema.index({ facultyId: 1 });

export default mongoose.models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema);
