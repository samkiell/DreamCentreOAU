import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string; // The generated DCO-XXX-YY-ZZZ ID
  departmentCode: string;
  admissionYear: number;
  status: 'PENDING' | 'AWAITING_APPROVAL' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true, // Allows null/undefined until ID is generated upon approval
      index: true,
    },
    departmentCode: { type: String, required: true, uppercase: true },
    admissionYear: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'AWAITING_APPROVAL', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
