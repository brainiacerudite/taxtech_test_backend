import mongoose from 'mongoose';

export const connectTestDB = async () => {
  try {
    const dbName = `test_shipment_${Date.now()}`;
    const url = `mongodb://localhost:27017/${dbName}`;
    await mongoose.connect(url);
  } catch (error) {
    console.error("Test DB Connection Error", error);
    process.exit(1);
  }
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};