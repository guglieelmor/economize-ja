import mongoose, { Schema } from 'mongoose';
const GoalSchema = new Schema(
  {

    title: {type: String, required: true, trim: true},
    balanceCategory: {type: String, required: true},
    initialValue: {type: Number, required: true},
    monthlyValue: {type: Number, required: true},
    interestRate: {type: Number, required: true},
    endGoalValue: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Goal = mongoose.model('Goal', GoalSchema);
export type GoalProps = typeof Goal;
export { Goal };
