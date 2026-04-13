import mongoose from "mongoose";
import User from "../models/user.js";

const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany([
      {
        id: 101,
        name: "admin",
        username: "admin",
        email: "admin@mail",
        password: "123a",
        rol: "admin",
      },
      {
        id: 102,
        name: "Developer",
        username: "dev",
        email: "dev@mail",
        password: "123d",
        rol: "dev",
      },
      {
        id: 103,
        name: "user",
        username: "user",
        email: "user@mail",
        password: "123u",
        rol: "user",
      },
    ]);
  }
};

const dbConnection = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    await mongoose.connect(`${dbURI}/${dbName}`);
    console.log(`MongoDB is connected`);

    await seedUsers();
    console.log(`Default users created (admin, dev, user)`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
