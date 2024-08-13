import mongoose from 'mongoose';

// Cached connection variable
let cachedConnection: mongoose.Mongoose | null = null;
let isConnected = false; // Flag to track connection status

// Utility function to measure execution time
const measureExecutionTime = async (fn: () => Promise<void>) => {
  const start = Date.now();
  await fn();
  const end = Date.now();
  console.log(`Execution time: ${end - start}ms`);
};

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  // Return the cached connection if it exists
  if (cachedConnection) {
    console.log('Returning cached MongoDB connection.');
    return cachedConnection;
  }

  // If no cached connection, establish a new one
  try {
    await measureExecutionTime(async () => {
      const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: 'katchyways', // Ensure you have the correct database name
      });

      // Update connection status and cache
      isConnected = true;
      cachedConnection = connection;
      console.log('MongoDB connected successfully.');
    });

    return cachedConnection;
  } catch (error) {
    // Log and throw the error for handling at a higher level
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB.');
  }
};
