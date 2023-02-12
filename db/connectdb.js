import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
 try {
  const DB_OPTIONS = {
   dbName: 'blogdb',
   useNewUrlParser: true,  
   useUnifiedTopology: true,  
   
  }
  await mongoose.connect(DATABASE_URL, DB_OPTIONS);
  console.log('Connected Successfully..');
 } catch (err) {
  console.log(err);
 }
}

export default connectDB
