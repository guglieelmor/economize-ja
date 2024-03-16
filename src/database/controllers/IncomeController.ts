import database from '../MongoConnect';
import { Income } from '../schemas/IncomeSchema';

import { Schema } from 'mongoose';

type IncomeProps = {
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  user: Schema.Types.ObjectId;
  _id: string;
};

const store = async (query: IncomeProps) => {
  try {
    if (!database.connect()) return false;
    const { title, amount, category, description, date, user } = query;

    const dateObj = new Date(date);

    // Obtém a string no formato ISODate
    const isoDate = dateObj.toISOString();

    const income = new Income({
      title,
      amount,
      category,
      date: isoDate,
      description,
      user
    });
    if (await income.save()) {
      return { status: 1, message: `Created with success`, income };
    }
  } catch (e) {
    throw new Error('Error in create income');
  }
};

const show = async (id: string) => {
  try {
    if (!database.connect()) return false;
    const data = await Income.find({ user: id }).sort({ createdAt: -1 });
    return data;
  } catch (e) {
    throw new Error('Error in show income');
  }
};

const deleteById = async (id: string, user: string) => {
  try {
    if (!database.connect()) return false;
    const income = await Income.find({ user, _id: id });
    if (income) {
      const data = await Income.findByIdAndDelete(id);
      return data;
    }
  } catch (e) {
    throw new Error('Error in delete income');
  }
};

const updateIncome = async (user: string, query: IncomeProps) => {
  try {
    if (!database.connect()) return false;

    const income = await Income.find({ user, _id: query._id });

    const dateObj = new Date(query.date);

    const isoDate = dateObj.toISOString();

    const data = { data: isoDate, ...query };
    if (income) {
      await Income.findByIdAndUpdate(query._id, data);
      return { data: isoDate, ...query };
    }
  } catch (e) {
    throw new Error('Error in update income');
  }
};

const incomeController = {
  store,
  show,
  deleteById,
  updateIncome
};

export default incomeController;
