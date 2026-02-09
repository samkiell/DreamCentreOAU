import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  studentId: string;
  matricNumber: string;
  sex: 'Male' | 'Female';
  departmentCode: string;
  faculty: string;
  admissionYear: number;
  phoneNumber?: string;
  profileImage?: string;
  role: 'USER' | 'ADMIN';
  status: 'PENDING' | 'AWAITING_APPROVAL' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String },
    sex: { type: String, enum: ['Male', 'Female'], required: true },
    profileImage: { type: String },
    matricNumber: { type: String, required: true, unique: true },
    studentId: {
      type: String,
      unique: true,
      sparse: true, // Allows null/undefined until ID is generated upon approval
      index: true,
    },
    departmentCode: { type: String, required: true, uppercase: true },
    faculty: { type: String, required: true },
    admissionYear: { type: Number, required: true },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    status: {
      type: String,
      enum: ['PENDING', 'AWAITING_APPROVAL', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
