import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { kafkaConnect, kafkaDisconnect } from "./services/kafkaService.js";

dotenv.config();

// Connect to the database
connectDB()
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
  try {
    await kafkaConnect();
    console.log("Kafka connected".green);
  } catch (error) {
    console.error("Kafka connection failed:", error);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await kafkaDisconnect();
  console.log("Kafka disconnected on exit".blue);
  server.close(() => {
    console.log("Process terminated".red);
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  await kafkaDisconnect();
  console.log("Kafka disconnected on exit".blue);
  server.close(() => {
    console.log("Process terminated".red);
    process.exit(0);
  });
});
