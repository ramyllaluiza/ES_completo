const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticação',
      version: '1.0.0',
      description: 'API para autenticação de usuários com JWT',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./rotas/*.js'], // Ajuste o caminho conforme a localização do arquivo de rotas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
