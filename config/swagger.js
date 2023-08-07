const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Note Taking API",
      version: "1.0.0",
      description: "API documentation for the Note Taking application",
    },
    servers: [
      {
        url: "http://localhost:8090", // Update with your API base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
