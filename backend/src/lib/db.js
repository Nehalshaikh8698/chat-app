import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `✅ MongoDB Connected: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    // Stop startup if database connection fails
    throw error;
  }
};