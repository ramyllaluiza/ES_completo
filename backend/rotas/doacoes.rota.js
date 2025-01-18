const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const doacoes = {};

/**
 * @swagger
 * tags:
 *   name: Doações
 *   description: API para gerenciar doações de itens
 */

/**
 * @swagger
 * /doacoes/{id}:
 *   get:
 *     tags: [Doações]
 *     summary: Recupera uma doação específica pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da doação a ser recuperada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 nome:
 *                   type: string
 *                   example: "Alimentos"
 *                 descricao:
 *                   type: string
 *                   example: "Cestas básicas para doação"
 *                 quantidade:
 *                   type: integer
 *                   example: 100
 *       404:
 *         description: Doação não encontrada
 */
router.get('/:id', (req, res) => {
    const doacao = doacoes[req.params.id];
    if (doacao) {
        res.json({ doacao });
    } else {
        res.status(404).json({ msg: "Doação não encontrada!" });
    }
});

/**
 * @swagger
 * /doacoes/{id}:
 *   put:
 *     tags: [Doações]
 *     summary: Atualiza uma doação existente
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: ID da doação a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Doação atualizada com sucesso
 *       400:
 *         description: Doação não encontrada
 */
router.put('/', (req, res) => {
    const id = req.query.id;  // Usando req.query para pegar o id da query string

    if (id && doacoes[id]) {
        const doacao = req.body;
        doacao.id = id;
        doacoes[id] = doacao;
        res.json({ msg: "Doação atualizada com sucesso!" });
    } else {
        res.status(404).json({ msg: "Doação não encontrada!" });  // Status 404 é mais apropriado aqui
    }
});

/**
 * @swagger
 * /doacoes/{id}:
 *   delete:
 *     tags: [Doações]
 *     summary: Deleta uma doação existente
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: ID da doação a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doação deletada com sucesso
 *       400:
 *         description: Doação não encontrada
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;  // Pega o ID diretamente da URL
    if (id && doacoes[id]) {
      delete doacoes[id];
      res.json({ msg: "Doação deletada com sucesso!" });
    } else {
      res.status(400).json({ msg: "Doação não encontrada!" });
    }
  });
  
/**
 * @swagger
 * /doacoes:
 *   post:
 *     tags: [Doações]
 *     summary: Adiciona uma nova doação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Doação adicionada com sucesso
 *       400:
 *         description: O item já foi adicionado
 */
router.post('/', (req, res) => {
    const doacao = req.body;
    const itemExistente = Object.values(doacoes).find(d => d.nome === doacao.nome);

    if (itemExistente) {
        return res.status(400).json({ msg: `O item '${doacao.nome}' já foi adicionado!` });
    }

    const idDoacao = uuidv4();
    doacao.id = idDoacao;
    doacoes[idDoacao] = doacao;

    // Incluindo o ID na resposta
    res.json({ 
        msg: "Doação adicionada com sucesso!",
        id: idDoacao // Retorna o ID gerado
    });
});

/**
 * @swagger
 * /doacoes:
 *   get:
 *     tags: [Doações]
 *     summary: Recupera todas as doações
 *     responses:
 *       200:
 *         description: Lista de todas as doações
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
 *                   nome:
 *                     type: string
 *                     example: "Alimentos"
 *                   descricao:
 *                     type: string
 *                     example: "Cestas básicas para doação"
 *                   quantidade:
 *                     type: integer
 *                     example: 100
 */
router.get('/', (req, res) => {
    res.json({ doacoes: Object.values(doacoes) });
});

module.exports = router;