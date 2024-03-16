import database from '../MongoConnect';
import { User } from '../schemas/UserSchema';

import bcryptjs from 'bcryptjs';
interface UserProps {
  _id?: string;
  fullname?: string;
  password?: string;
  email?: string;
  avatar?: string;
  expenseCategories?: { expenseCategory: string}[];
  incomeCategories?: { incomeCategory: string}[];
}

const createUser = async (queryUser: UserProps) => {
  try {
    if (!database.connect()) return false;
    const { password, email } = queryUser;

    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return { status: 0, message: `Email já cadastrado` };
    }

    const salt = bcryptjs.genSaltSync();
    if(password){
      const cryptPassword = bcryptjs.hashSync(password, salt);
      const dataUser = { ...queryUser, password: cryptPassword };
      const user = new User(dataUser);
      if (await user.save()) {
        return { status: 1, email, message: `Created with success` };
      }
    }

  } catch (e) {
    throw new Error('Error in create user');
  }
};

const showUser = async (id?: string) => {
  try {
    if (!database.connect()) return false;
    if (id) {
      const user = await User.findById(id);
      return user;
    }
  } catch (e) {
    console.error(e);
  }
};

const updateUser = async (user: UserProps) => {
  try {
    if (!database.connect()) return false;

    const userDB = await User.findById(user._id);

    if (userDB) {
      await User.findByIdAndUpdate(user._id, user);
      return { status: 1, message: 'updated user with success', user: { id: user._id, ...user} };
    }
  } catch (e) {
    throw new Error('Error in update user');
  }
};

const userController = {
  createUser,
  showUser,
  updateUser
};

export default userController;
