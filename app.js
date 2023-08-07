require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRotes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); // Update with the correct path

const app = express();

// Enabling CORS
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8090;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
