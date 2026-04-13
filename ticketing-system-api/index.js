import 'dotenv/config';
import express from "express";
import dbConnection from "./config/database.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await dbConnection();
    console.log("Database connected.");
    app.use("/api", routes);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server or connect to DB:", error.message);
  }
};

startServer();
