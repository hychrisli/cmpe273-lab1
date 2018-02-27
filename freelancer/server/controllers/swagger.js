const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
    },
    schemes: ['http'],
    host: 'localhost:5000',
    basePath: '/api'
  },
  apis: ['./routes'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec)
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
