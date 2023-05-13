import mongoose from 'mongoose';
import UserModel from './model/User';

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_STRING_CONNECTION!, 
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
  }
};

export default class MongoDbConnection {
  constructor() {
    connectToDb();
  }

  async query(model: mongoose.Model<any>, query: any) {
    return await model.find(query, { _id: 0 });
  }
}
