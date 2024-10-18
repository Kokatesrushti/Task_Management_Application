// import mongoose from "mongoose";

// export const connectMongo=async()=>{
//     try {
//         await mongoose.connect(process.env.DATABASE_URL)
//         console.log("Database connected")
//     } catch (error) {
//         console.log("Database connection error",error)
//     }
// }

import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB connected:', conn.connection.host);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process if unable to connect to DB
  }
};

