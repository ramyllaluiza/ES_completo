const express = require('express');
const helmet = require('helmet'); // Middleware para segurança
const cors = require('cors'); // Middleware para controle de CORS
const rotaLogin = require('./rotas/login.rota');
const rotaDoacao = require('./rotas/doacoes.rota');
const rotaAuth = require('./rotas/auth.rota');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const app = express();

// Middleware de segurança e CORS
app.use(helmet());
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use('/login', rotaLogin);
app.use('/doacoes', rotaDoacao);
app.use('/auth', rotaAuth);

// Rota de exemplo
app.get('/', (req, res) => {
  res.json({ msg: "Hello from Express!" });
});

// Middleware para capturar erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

// Porta configurada via variável de ambiente ou padrão
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor pronto na porta ${PORT} : http://localhost:8080/`);
  console.log('Documentação disponível em http://localhost:8080/api-docs');
});
