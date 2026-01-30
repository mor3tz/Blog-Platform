const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blogging Platform API",
      version: "1.0.0",
      description: "API Documentation for Blogging Platform",
    },
    servers: [
      {
        url: "http://localhost:5001/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.routes.js"],
};
console.log("SWAGGER APIS:", options.apis);

module.exports = swaggerJSDoc(options);
