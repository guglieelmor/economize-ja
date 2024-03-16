import mongoose, { Schema } from 'mongoose';
const ExpenseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxLength: 50 },
    amount: { type: Number, required: true, trim: true, maxLength: 20 },
    type: { type: String, default: 'expense' },
    date: { type: Date, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxLength: 35 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', ExpenseSchema);

export { Expense };
