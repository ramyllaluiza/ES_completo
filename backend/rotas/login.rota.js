const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const login = {};

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: API para gerenciar os logins de usuários
 */

/**
 * @swagger
 * /login/{id}:
 *   get:
 *     tags: [Login]
 *     summary: Recupera um login específico pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do login a ser recuperado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 email:
 *                   type: string
 *                   example: joaosilva@gmail.com
 *                 senha:
 *                   type: string
 *                   example: 123456
 *       404:
 *         description: Login não encontrado
 */
router.get('/:id', (req, res) => {
    const loginEncontrado = login[req.params.id];
    if (loginEncontrado) {
        res.json({ login: loginEncontrado });
    } else {
        res.status(404).json({ msg: "Login não encontrado!" });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Login]
 *     summary: Adiciona um novo login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joaosilva@gmail.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login adicionado com sucesso
 *       400:
 *         description: Login já registrado
 */
router.post('/', async (req, res) => {
    const { email, senha } = req.body;
  
    // Verifica se o email já está registrado
    const loginExistente = Object.values(login).find((u) => u.email === email);
    if (loginExistente) {
        return res.status(400).json({ msg: "Login já registrado." });
    }
  
    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
  
    const id = uuidv4();
    const novoLogin = { id, email, senha: senhaCriptografada };
    login[id] = novoLogin;
  
    res.json({ msg: "Login registrado com sucesso!", login: novoLogin });
});

/**
 * @swagger
 * /login/{id}:
 *   put:
 *     tags: [Login]
 *     summary: Atualiza um login existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do login a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joaosilva2@gmail.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login atualizado com sucesso
 *       400:
 *         description: Login não encontrado
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    const loginExistente = login[id];
    if (!loginExistente) {
        return res.status(400).json({ msg: "Login não encontrado!" });
    }

    // Verifica se o email é válido e criptografa a nova senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Atualiza as informações do login
    login[id] = { id, email, senha: senhaCriptografada };
    res.json({ msg: "Login atualizado com sucesso!" });
});

/**
 * @swagger
 * /login/{id}:
 *   delete:
 *     tags: [Login]
 *     summary: Deleta um login específico pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do login a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login deletado com sucesso
 *       400:
 *         description: Login não encontrado
 */
router.delete('/', (req, res) => {
    const { id } = req.query;  // Usando req.query para pegar o id da query string

    if (login[id]) {
        delete login[id];
        res.json({ msg: "Login deletado com sucesso!" });
    } else {
        res.status(404).json({ msg: "Login não encontrado!" });  // Status 404 é mais apropriado aqui
    }
});


/**
 * @swagger
 * /login:
 *   get:
 *     tags: [Login]
 *     summary: Retorna todos os logins
 *     responses:
 *       200:
 *         description: Lista de todos os logins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   email:
 *                     type: string
 *                     example: joaosilva@gmail.com
 *                   senha:
 *                     type: string
 *                     example: 123456
 */
router.get('/', (req, res) => {
    res.json({ logins: Object.values(login) });
});

module.exports = router;
