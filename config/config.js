require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "node_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
  test: {
    username: process.env.TEST_DB_USER || "root",
    password: process.env.TEST_DB_PASSWORD || null,
    database: process.env.TEST_DB_NAME || "node_db",
    host: process.env.TEST_DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "node_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  },
};
