import mongoose from "mongoose";

const connectDB = async () => {
  // Default local MongoDB URI
  const dbURI = "mongodb://127.0.0.1:27017/artisan-web";

  try {
    const conn = await mongoose.connect(dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}.cyan.underline`);
  } catch (error) {
    console.error(`Error: ${error}.red.underline.bold`);
    process.exit(1);
  }
};

export default connectDB;
