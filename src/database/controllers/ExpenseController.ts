import database from '../MongoConnect';
import { Expense } from '../schemas/ExpenseSchema';

import { Schema } from 'mongoose';

export type ExpenseProps = {
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  user: Schema.Types.ObjectId;
  _id: string;
};
const store = async (query: ExpenseProps) => {
  try {
    if (!database.connect()) return false;
    const { title, amount, category, description, date, user } = query;

    const dateObj = new Date(date);

    // Obtém a string no formato ISODate
    const isoDate = dateObj.toISOString();

    const expense = new Expense({
      title,
      amount,
      category,
      date: isoDate,
      description,
      user
    });
    if (await expense.save()) {
      return { status: 1, message: `Created with success`, expense };
    }
  } catch (e) {
    throw new Error('Error in create expense');
  }
};

const show = async (id: string) => {
  try {
    if (!database.connect()) return false;
    const data = await Expense.find({ user: id }).sort({ createdAt: -1 });
    return data;
  } catch (e) {
    throw new Error('Error in show expense');
  }
};

const deleteById = async (id: string, user: string) => {
  try {
    if (!database.connect()) return false;
    const expense = await Expense.find({ user, _id: id });
    if (expense) {
      const data = await Expense.findByIdAndDelete(id);
      return data;
    }
  } catch (e) {
    throw new Error('Error in delete expense');
  }
};

const updateExpense = async (user: string, query: ExpenseProps) => {
  try {
    if (!database.connect()) return false;

    const expense = await Expense.find({ user, _id: query._id });

    const dateObj = new Date(query.date);

    const isoDate = dateObj.toISOString();

    const data = { data: isoDate, ...query };
    if (expense) {
      await Expense.findByIdAndUpdate(query._id, data);
      return { data: isoDate, ...query };
    }
  } catch (e) {
    throw new Error('Error in update expense');
  }
};

const expenseController = {
  store,
  show,
  deleteById,
  updateExpense
};

export default expenseController;
