const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
module.exports = router;


// Função para gerar o token JWT
function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    'secreta',
    { expiresIn: '1h' }
  );
}

// Exemplo de banco de dados com usuários
const usuarios = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@example.com',
    senha: '$2a$10$05zXWNbs5wehe6SUmQpZVO18XW0Ij1bU2PpGKpfZngydhPGFbnZVa', // senha: 123456
  },
];

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: API para autenticação de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza o login do usuário e retorna o token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Autenticação realizada com sucesso!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro interno ao processar a senha
 */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Busca o usuário pelo email
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return res.status(400).json({ msg: 'Usuário não encontrado!' });
  }

  // Compara a senha informada com a senha armazenada (criptografada)
  try {
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ msg: 'Senha incorreta!' });
    }

    // Gera o token JWT para o usuário
    const token = gerarToken(usuario);

    // Retorna o token para o usuário
    res.json({ msg: 'Autenticação realizada com sucesso!', token });
  } catch (err) {
    return res.status(500).json({ msg: 'Erro interno ao processar a senha!', error: err });
  }
});

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     tags: [Autenticação]
 *     summary: Retorna o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna as informações do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@example.com"
 *       401:
 *         description: Acesso negado. Token não fornecido ou inválido
 */
router.get('/perfil', autenticarToken, (req, res) => {
  res.json({
    usuario: req.usuario,
  });
});

// Middleware para proteger rotas
function autenticarToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido!' });
  }

  jwt.verify(token, 'secreta', (err, usuario) => {
    if (err) {
      return res.status(401).json({ msg: 'Token inválido!' });
    }
    req.usuario = usuario;
    next();
  });
}

module.exports = router;
