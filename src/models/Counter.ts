import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Document {
  departmentCode: string;
  year: number;
  lastSequence: number;
}

const CounterSchema: Schema = new Schema(
  {
    departmentCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    lastSequence: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index to ensure sequence scoping
CounterSchema.index({ departmentCode: 1, year: 1 }, { unique: true });

export default mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);
