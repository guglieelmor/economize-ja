import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const url = process.env.MONGO_URL;
const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(url as string);
};

const disconnect = async () => {
  return await mongoose.disconnect();
};
const database = {
  connect,
  disconnect
};

export default database;
