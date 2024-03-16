import mongoose, { Schema } from 'mongoose';
const IncomeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxLength: 50 },
    amount: { type: Number, required: true, trim: true, maxLength: 20 },
    type: { type: String, default: 'income' },
    date: { type: Date, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxLength: 35 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Income = mongoose.model('Income', IncomeSchema);
export type IncomeProps = typeof Income;
export { Income };
